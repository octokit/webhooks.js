import { createLogger } from "../../createLogger.js";
import type { Webhooks } from "../../index.js";
import { middleware } from "./middleware.js";
import type { MiddlewareOptions } from "./types.ts";

export function createNodeMiddleware(
  webhooks: Webhooks,
  {
    path = "/api/github/webhooks",
    log = createLogger(),
  }: MiddlewareOptions = {},
) {
  return middleware.bind(null, webhooks, {
    path,
    log,
  } as Required<MiddlewareOptions>);
}
