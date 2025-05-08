import { createLogger } from "../../createLogger.js";
import type { Webhooks } from "../../index.js";
import type { MiddlewareOptions } from "../types.js";

import { createMiddleware } from "../create-middleware.js";
import { getMissingHeaders } from "./get-missing-headers.js";
import { getPayload } from "./get-payload.js";
import { getRequestHeader } from "./get-request-header.js";
import { handleResponse } from "./handle-response.js";

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
