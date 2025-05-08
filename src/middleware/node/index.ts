import { createLogger } from "../../createLogger.js";
import type { Webhooks } from "../../index.js";
import type { MiddlewareOptions } from "../types.js";
import { createMiddleware } from "../create-middleware.js";
import { handleResponse } from "./handle-response.js";
import { getRequestHeader } from "./get-request-header.js";
import { getPayload } from "./get-payload.js";
import { getMissingHeaders } from "./get-missing-headers.js";

export function createNodeMiddleware(
  webhooks: Webhooks,
  {
    path = "/api/github/webhooks",
    log = createLogger(),
  }: MiddlewareOptions = {},
) {
  return createMiddleware({
    handleResponse: handleResponse,
    getRequestHeader: getRequestHeader,
    getPayload: getPayload,
    getMissingHeaders: getMissingHeaders,
  }).bind(null, webhooks, {
    path,
    log,
  } as Required<MiddlewareOptions>);
}
