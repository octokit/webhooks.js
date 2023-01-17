// remove type imports from http for Deno compatibility
// see https://github.com/octokit/octokit.js/issues/2075#issuecomment-817361886
// import { IncomingMessage, ServerResponse } from "http";
type IncomingMessage = any;
type ServerResponse = any;

import { WebhookEventName } from "@octokit/webhooks-types";

import { Webhooks } from "../../index";
import { WebhookEventHandlerError } from "../../types";
import { MiddlewareOptions } from "./types";
import { getMissingHeaders } from "./get-missing-headers";
import { getPayload } from "./get-payload";

export async function middleware(
  webhooks: Webhooks,
  options: Required<MiddlewareOptions>,
  request: IncomingMessage,
  response: ServerResponse,
  next?: Function
) {
  let pathname: string;
  try {
    pathname = new URL(request.url as string, "http://localhost").pathname;
  } catch (error) {
    response.writeHead(422, {
      "content-type": "application/json",
    });
    response.end(
      JSON.stringify({
        error: `Request URL could not be parsed: ${request.url}`,
      })
    );
    return;
  }

  const isUnknownRoute = request.method !== "POST" || pathname !== options.path;
  const isExpressMiddleware = typeof next === "function";
  if (isUnknownRoute) {
    if (isExpressMiddleware) {
      return next!();
    } else {
      return options.onUnhandledRequest(request, response);
    }
  }

  // Check if the Content-Type header is `application/json` and allow for charset to be specified in it
  // Otherwise, return a 415 Unsupported Media Type error
  // See https://github.com/octokit/webhooks.js/issues/158
  if (
    request.headers["content-type"] == null ||
    !request.headers["content-type"].startsWith("application/json")
  ) {
    response.writeHead(415, {
      "content-type": "application/json",
      accept: "application/json",
    });
    response.end(
      JSON.stringify({
        error: `Unsupported "Content-Type" header value. Must be "application/json"`,
      })
    );
    return;
  }

  const missingHeaders = getMissingHeaders(request).join(", ");

  if (missingHeaders) {
    response.writeHead(400, {
      "content-type": "application/json",
    });
    response.end(
      JSON.stringify({
        error: `Required headers missing: ${missingHeaders}`,
      })
    );

    return;
  }

  const eventName = request.headers["x-github-event"] as WebhookEventName;
  const signatureSHA256 = request.headers["x-hub-signature-256"] as string;
  const id = request.headers["x-github-delivery"] as string;

  options.log.debug(`${eventName} event received (id: ${id})`);

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
      payload: payload as any,
      signature: signatureSHA256,
    });
    clearTimeout(timeout);

    if (didTimeout) return;

    response.end("ok\n");
  } catch (error) {
    clearTimeout(timeout);

    if (didTimeout) return;

    const err = Array.from(error as WebhookEventHandlerError)[0];
    const errorMessage = err.message
      ? `${err.name}: ${err.message}`
      : "Error: An Unspecified error occurred";
    response.statusCode = typeof err.status !== "undefined" ? err.status : 500;

    options.log.error(error);

    response.end(
      JSON.stringify({
        error: errorMessage,
      })
    );
  }
}
