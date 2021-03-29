import { IncomingMessage, ServerResponse } from "http";

import { WebhookEventName } from "@octokit/webhooks-definitions/schema";

import { Webhooks } from "../../index";
import { WebhookEventHandlerError } from "../../types";
import { MiddlewareOptions } from "./types";
import { onUnhandledRequestDefault } from "./on-unhandled-request-default";
import { getMissingHeaders } from "./get-missing-headers";
import { getPayload } from "./get-payload";

export function middleware(
  webhooks: Webhooks,
  options: Required<MiddlewareOptions>,
  request: IncomingMessage,
  response: ServerResponse,
  next?: Function
) {
  const { pathname } = new URL(request.url as string, "http://localhost");

  if (request.method !== "POST" || pathname !== options.path) {
    if (next) {
      next();
      return;
    }

    return onUnhandledRequestDefault(request, response);
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

  // GitHub will abort the request if it does not receive a response within 10s
  // See https://github.com/octokit/webhooks.js/issues/185
  let didTimeout = false;
  const timeout = setTimeout(() => {
    didTimeout = true;
    response.statusCode = 202;
    response.end("still processing\n");
  }, 9000).unref();

  return getPayload(request)
    .then((payload) => {
      return webhooks.verifyAndReceive({
        id: id,
        name: eventName as any,
        payload: payload as any,
        signature: signatureSHA256,
      });
    })

    .then(() => {
      clearTimeout(timeout);

      if (didTimeout) return;

      response.end("ok\n");
    })

    .catch((error: WebhookEventHandlerError) => {
      clearTimeout(timeout);

      if (didTimeout) return;

      const statusCode = Array.from(error)[0].status;
      response.statusCode = statusCode || 500;
      response.end(error.toString());
    });
}
