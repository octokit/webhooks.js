import { createLogger } from "../../createLogger.ts";
import type { Webhooks } from "../../index.ts";
import { middleware } from "./middleware.ts";
import type { MiddlewareOptions } from "../types.ts";

export function createWebMiddleware(
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
