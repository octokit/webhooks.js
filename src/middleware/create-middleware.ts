import type { WebhookEventName } from "../generated/webhook-identifiers.ts";

import type { Webhooks } from "../index.ts";
import type { WebhookEventHandlerError } from "../types.ts";
import type { MiddlewareOptions } from "./types.ts";

type CreateMiddlewareOptions = {
  handleResponse: (
    body: string | null,
    status?: number,
    headers?: Record<string, string>,
    response?: any,
  ) => any;
  getPayload: (request: Request) => Promise<string>;
  getRequestHeader: <T = string>(request: Request, key: string) => T;
};

const isApplicationJsonRE = /^\s*(application\/json)\s*(?:;|$)/u;

type IncomingMessage = any;
type ServerResponse = any;

const WEBHOOK_HEADERS = [
  "x-github-event",
  "x-hub-signature-256",
  "x-github-delivery",
];

export function createMiddleware(options: CreateMiddlewareOptions) {
  const { handleResponse, getRequestHeader, getPayload } = options;

  return function middleware(
    webhooks: Webhooks,
    options: Required<MiddlewareOptions>,
  ) {
    return async function octokitWebhooksMiddleware(
      request: IncomingMessage,
      response?: ServerResponse,
      next?: Function,
    ) {
      let pathname: string;
      try {
        pathname = new URL(request.url as string, "http://localhost").pathname;
      } catch (error) {
        return handleResponse(
          JSON.stringify({
            error: `Request URL could not be parsed: ${request.url}`,
          }),
          422,
          {
            "content-type": "application/json",
          },
          response,
        );
      }

      if (pathname !== options.path) {
        next?.();
        return handleResponse(null);
      } else if (request.method !== "POST") {
        return handleResponse(
          JSON.stringify({
            error: `Unknown route: ${request.method} ${pathname}`,
          }),
          404,
          {
            "content-type": "application/json",
          },
          response,
        );
      }

      // Check if the Content-Type header is `application/json` and allow for charset to be specified in it
      // Otherwise, return a 415 Unsupported Media Type error
      // See https://github.com/octokit/webhooks.js/issues/158
      const contentType = getRequestHeader(request, "content-type");

      if (
        typeof contentType !== "string" ||
        !isApplicationJsonRE.test(contentType)
      ) {
        return handleResponse(
          JSON.stringify({
            error: `Unsupported "Content-Type" header value. Must be "application/json"`,
          }),
          415,
          {
            "content-type": "application/json",
            accept: "application/json",
          },
          response,
        );
      }

      const missingHeaders = WEBHOOK_HEADERS.filter((header) => {
        return getRequestHeader(request, header) == undefined;
      }).join(", ");

      if (missingHeaders) {
        return handleResponse(
          JSON.stringify({
            error: `Required headers missing: ${missingHeaders}`,
          }),
          400,
          {
            "content-type": "application/json",
            accept: "application/json",
          },
          response,
        );
      }

      const eventName = getRequestHeader<WebhookEventName>(
        request,
        "x-github-event",
      );
      const signature = getRequestHeader(request, "x-hub-signature-256");
      const id = getRequestHeader(request, "x-github-delivery");

      options.log.debug(`${eventName} event received (id: ${id})`);

      // GitHub will abort the request if it does not receive a response within 10s
      // See https://github.com/octokit/webhooks.js/issues/185
      let didTimeout = false;
      let timeout: ReturnType<typeof setTimeout>;
      const timeoutPromise = new Promise<Response>((resolve) => {
        timeout = setTimeout(() => {
          didTimeout = true;
          resolve(
            handleResponse(
              "still processing\n",
              202,
              {
                "Content-Type": "text/plain",
                accept: "application/json",
              },
              response,
            ),
          );
        }, options.timeout);
      });

      const processWebhook = async () => {
        try {
          const payload = await getPayload(request);

          await webhooks.verifyAndReceive({
            id,
            name: eventName,
            payload,
            signature,
          });
          clearTimeout(timeout);

          if (didTimeout) return handleResponse(null);

          return handleResponse(
            "ok\n",
            200,
            {
              "content-type": "text/plain",
              accept: "application/json",
            },
            response,
          );
        } catch (error) {
          clearTimeout(timeout);

          if (didTimeout) return handleResponse(null);

          const err = Array.from((error as WebhookEventHandlerError).errors)[0];
          const errorMessage = err.message
            ? `${err.name}: ${err.message}`
            : "Error: An Unspecified error occurred";
          const statusCode =
            typeof err.status !== "undefined" ? err.status : 500;

          options.log.error(error);

          return handleResponse(
            JSON.stringify({
              error: errorMessage,
            }),
            statusCode,
            {
              "content-type": "application/json",
              accept: "application/json",
            },
            response,
          );
        }
      };

      return await Promise.race([timeoutPromise, processWebhook()]);
    };
  };
}
