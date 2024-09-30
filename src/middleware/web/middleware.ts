import type { WebhookEventName } from "../../generated/webhook-identifiers.js";

import type { Webhooks } from "../../index.js";
import type { WebhookEventHandlerError } from "../../types.js";
import type { MiddlewareOptions } from "../types.js";
import { getMissingHeaders } from "./get-missing-headers.js";
import { getPayload } from "./get-payload.js";
import { onUnhandledRequestDefault } from "./on-unhandled-request-default.js";

export async function middleware(
  webhooks: Webhooks,
  options: Required<MiddlewareOptions>,
  request: Request,
) {
  let pathname: string;
  try {
    pathname = new URL(request.url as string, "http://localhost").pathname;
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: `Request URL could not be parsed: ${request.url}`,
      }),
      {
        status: 422,
        headers: {
          "content-type": "application/json",
        },
      },
    );
  }

  if (pathname !== options.path || request.method !== "POST") {
    return onUnhandledRequestDefault(request);
  }

  // Check if the Content-Type header is `application/json` and allow for charset to be specified in it
  // Otherwise, return a 415 Unsupported Media Type error
  // See https://github.com/octokit/webhooks.js/issues/158
  if (
    typeof request.headers.get("content-type") !== "string" ||
    !request.headers.get("content-type")!.startsWith("application/json")
  ) {
    return new Response(
      JSON.stringify({
        error: `Unsupported "Content-Type" header value. Must be "application/json"`,
      }),
      {
        status: 415,
        headers: {
          "content-type": "application/json",
        },
      },
    );
  }

  const missingHeaders = getMissingHeaders(request).join(", ");

  if (missingHeaders) {
    return new Response(
      JSON.stringify({
        error: `Required headers missing: ${missingHeaders}`,
      }),
      {
        status: 422,
        headers: {
          "content-type": "application/json",
        },
      },
    );
  }

  const eventName = request.headers.get("x-github-event") as WebhookEventName;
  const signatureSHA256 = request.headers.get("x-hub-signature-256") as string;
  const id = request.headers.get("x-github-delivery") as string;

  options.log.debug(`${eventName} event received (id: ${id})`);

  // GitHub will abort the request if it does not receive a response within 10s
  // See https://github.com/octokit/webhooks.js/issues/185
  let didTimeout = false;
  let timeout: ReturnType<typeof setTimeout>;
  const timeoutPromise = new Promise<Response>((resolve) => {
    timeout = setTimeout(() => {
      didTimeout = true;
      resolve(
        new Response("still processing\n", {
          status: 202,
          headers: { "Content-Type": "text/plain" }
        })
      );
    }, 9000).unref();
  });

  const processWebhook = async () => {
    try {
      const payload = await getPayload(request);

      await webhooks.verifyAndReceive({
        id: id,
        name: eventName,
        payload,
        signature: signatureSHA256,
      });
      clearTimeout(timeout);

      if (didTimeout) return new Response(null);

      return new Response("ok\n");
    } catch (error) {
      clearTimeout(timeout);

      if (didTimeout) return new Response(null);

      const err = Array.from((error as WebhookEventHandlerError).errors)[0];
      const errorMessage = err.message
        ? `${err.name}: ${err.message}`
        : "Error: An Unspecified error occurred";

      options.log.error(error);

      return new Response(JSON.stringify({
          error: errorMessage,
        }), {
          status: typeof err.status !== "undefined" ? err.status : 500,
          headers: {
            "content-type": "application/json",
          },
        })
    }
  }
  
  return await Promise.race([timeoutPromise, processWebhook()]);
}
