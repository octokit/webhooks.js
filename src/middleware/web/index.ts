import { createLogger } from "../../create-logger.ts";
import type { MiddlewareOptions, Webhooks } from "../../index.ts";

import { createMiddleware } from "../create-middleware.ts";
import { getPayload } from "./get-payload.ts";
import { getRequestHeader } from "./get-request-header.ts";
import { handleResponse } from "./handle-response.ts";

export function createWebMiddleware(
  webhooks: Webhooks,
  {
    path = "/api/github/webhooks",
    log = createLogger(),
    timeout = 9000,
  }: MiddlewareOptions = {},
) {
  return createMiddleware({
    handleResponse,
    getRequestHeader,
    getPayload,
  })(webhooks, {
    path,
    log,
    timeout,
  } as Required<MiddlewareOptions>);
}
