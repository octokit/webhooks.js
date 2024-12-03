// remove type imports from http for Deno compatibility
// see https://github.com/octokit/octokit.js/issues/2075#issuecomment-817361886
// import { IncomingMessage, ServerResponse } from "http";
type IncomingMessage = any;
type ServerResponse = any;

import type { WebhookEventName } from "../../generated/webhook-identifiers.js";

import type { Webhooks } from "../../index.js";
import type { WebhookEventHandlerError } from "../../types.js";
import type { MiddlewareOptions } from "./types.js";
import { validateHeaders } from "./validate-headers.js";
import { getPayload } from "./get-payload.js";

type Handler = (
  request: IncomingMessage,
  response: ServerResponse,
) => Promise<boolean>;
export function createNodeHandler(
  webhooks: Webhooks,
  options?: Pick<MiddlewareOptions, "log">,
): Handler {
  const logger = options?.log || console;
  return async function handler(
    request: IncomingMessage,
    response: ServerResponse,
  ): Promise<boolean> {
    // Check if the Content-Type header is `application/json` and allow for charset to be specified in it
    // Otherwise, return a 415 Unsupported Media Type error
    // See https://github.com/octokit/webhooks.js/issues/158
    if (
      !request.headers["content-type"] ||
      !request.headers["content-type"].startsWith("application/json")
    ) {
      response.writeHead(415, {
        "content-type": "application/json",
        accept: "application/json",
      });
      response.end(
        JSON.stringify({
          error: `Unsupported "Content-Type" header value. Must be "application/json"`,
        }),
      );
      return true;
    }

    if (validateHeaders(request, response)) {
      return true;
    }

    const eventName = request.headers["x-github-event"] as WebhookEventName;
    const signatureSHA256 = request.headers["x-hub-signature-256"] as string;
    const id = request.headers["x-github-delivery"] as string;

    logger.debug(`${eventName} event received (id: ${id})`);

    // GitHub will abort the request if it does not receive a response within 10s
    // See https://github.com/octokit/webhooks.js/issues/185
    let didTimeout = false;
    const timeout = setTimeout(() => {
      didTimeout = true;
      response.statusCode = 202;
      response.end("still processing\n");
    }, 9000).unref();

    try {
      const payload = await getPayload(request);

      await webhooks.verifyAndReceive({
        id: id,
        name: eventName as any,
        payload,
        signature: signatureSHA256,
      });
      clearTimeout(timeout);

      if (didTimeout) return true;

      response.end("ok\n");
      return true;
    } catch (error) {
      clearTimeout(timeout);

      if (didTimeout) return true;

      const err = Array.from((error as WebhookEventHandlerError).errors)[0];
      const errorMessage = err.message
        ? `${err.name}: ${err.message}`
        : "Error: An Unspecified error occurred";

      const statusCode = typeof err.status !== "undefined" ? err.status : 500;

      logger.error(error);

      response.writeHead(statusCode, {
        "content-type": "application/json",
      });

      response.end(
        JSON.stringify({
          error: errorMessage,
        }),
      );

      return true;
    }
  };
}
