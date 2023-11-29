// remove type imports from http for Deno compatibility
// see https://github.com/octokit/octokit.js/issues/2075#issuecomment-817361886
// import type { IncomingMessage, ServerResponse } from "node:http";
type IncomingMessage = any;
type ServerResponse = any;

import type { WebhookEventName } from "@octokit/webhooks-types";

import type { Webhooks } from "../../index.js";
import type { WebhookEventHandlerError } from "../../types.js";
import type { MiddlewareOptions } from "./types.js";
import { getMissingHeaders } from "./get-missing-headers.js";
import { getPayload } from "./get-payload.js";
import { onUnhandledRequestDefault } from "./on-unhandled-request-default.js";

export async function middleware(
  webhooks: Webhooks,
  options: Required<MiddlewareOptions>,
  request: IncomingMessage,
  response: ServerResponse,
  next?: Function,
): Promise<boolean> {
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
      }),
    );
    return true;
  }

  if (pathname !== options.path) {
    next?.();
    return false;
  } else if (request.method !== "POST") {
    onUnhandledRequestDefault(request, response);
    return true;
  }

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

  const missingHeaders = getMissingHeaders(request).join(", ");

  if (missingHeaders) {
    response.writeHead(400, {
      "content-type": "application/json",
    });
    response.end(
      JSON.stringify({
        error: `Required headers missing: ${missingHeaders}`,
      }),
    );

    return true;
  }

  const {
    "x-github-event": name,
    "x-hub-signature-256": signature,
    "x-github-delivery": id,
  } = request.headers as {
    'x-github-event': WebhookEventName;
    'x-hub-signature-256': string;
    'x-github-delivery': string;
  }
  options.log.debug(`${name} event received (id: ${id})`);

  // GitHub will abort the request if it does not receive a response within 10s
  // See https://github.com/octokit/webhooks.js/issues/185
  let didTimeout = false;
  const timeout = setTimeout(() => {
    didTimeout = true;
    response.statusCode = 202;
    response.end("still processing\n");
  }, 9000).unref();

  try {
    let payload: Buffer;
    let body: { [key: string]: any } | undefined;

    if ("body" in request) {
      if (
        typeof request.body === "object" &&
        "rawBody" in request &&
        request.rawBody instanceof Buffer
      ) {
        // The body is already an Object and rawBody is a Buffer (e.g. GCF)
        body = request.body;
        payload = request.rawBody;
      } else {
        // The body is a String (e.g. Lambda)
        payload = request.body;
      }
    } else {
      // We need to load the payload from the request (normal case of Node.js server)
      payload = await getPayload(request);
    }

    await webhooks.verifyAndReceive({
      id,
      name,
      payload,
      body,
      signature,
    });
    clearTimeout(timeout);

    if (didTimeout) return true;

    response.end("ok\n");
    return true;
  } catch (error) {
    clearTimeout(timeout);

    if (didTimeout) return true;

    const err = Array.from(error as WebhookEventHandlerError)[0];
    const errorMessage = err.message
      ? `${err.name}: ${err.message}`
      : "Error: An Unspecified error occurred";
    response.statusCode = typeof err.status !== "undefined" ? err.status : 500;

    options.log.error(error);

    response.end(
      JSON.stringify({
        error: errorMessage,
      }),
    );

    return true;
  }
}
