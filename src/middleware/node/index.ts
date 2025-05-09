import { createLogger } from "../../create-logger.ts";
import type { Webhooks } from "../../index.ts";
import type { MiddlewareOptions } from "../types.ts";
import { createMiddleware } from "../create-middleware.ts";
import { handleResponse } from "./handle-response.ts";
import { getRequestHeader } from "./get-request-header.ts";
import { getPayload } from "./get-payload.ts";
import { getMissingHeaders } from "./get-missing-headers.ts";

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
    getMissingHeaders,
  })(webhooks, {
    path,
    log,
    timeout,
  } as Required<MiddlewareOptions>);
}
