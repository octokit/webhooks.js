import { createLogger } from "../../create-logger.ts";
import type { Webhooks } from "../../index.ts";
import type { MiddlewareOptions } from "../types.ts";
import { createMiddleware } from "../create-middleware.ts";
import { handleResponse } from "./handle-response.ts";
import { getRequestHeader } from "./get-request-header.ts";
import { getPayload } from "./get-payload.ts";

export function createNodeMiddleware(
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
