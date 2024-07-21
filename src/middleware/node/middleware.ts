// remove type imports from http for Deno compatibility
// see https://github.com/octokit/octokit.js/issues/2075#issuecomment-817361886
import type { IncomingMessage, ServerResponse } from "node:http";

import { createNodeHandler } from "./handler.js";

import type { Webhooks } from "../../index.js";
import type { MiddlewareOptions } from "./types.js";
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

  return createNodeHandler(webhooks, options)(request, response);
}
