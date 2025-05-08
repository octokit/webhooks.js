import { createLogger } from "../../createLogger.ts";
import type { Webhooks } from "../../index.ts";
import type { MiddlewareOptions } from "../types.ts";

import { createMiddleware } from "../create-middleware.ts";
import { getMissingHeaders } from "./get-missing-headers.ts";
import { getPayload } from "./get-payload.ts";
import { getRequestHeader } from "./get-request-header.ts";
import { handleResponse } from "./handle-response.ts";

export function createWebMiddleware(
  webhooks: Webhooks,
  {
    path = "/api/github/webhooks",
    log = createLogger(),
  }: MiddlewareOptions = {},
) {
  return createMiddleware({
    handleResponse,
    getRequestHeader,
    getPayload,
    getMissingHeaders,
  }).bind(null, webhooks, {
    path,
    log,
  } as Required<MiddlewareOptions>);
}
