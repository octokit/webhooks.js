import { createLogger } from "../../createLogger";
import { Webhooks } from "../../index";
import { middleware } from "./middleware";
import { MiddlewareOptions } from "./types";

export function createNodeMiddleware(
  webhooks: Webhooks,
  {
    path = "/api/github/webhooks",
    log = createLogger(),
  }: MiddlewareOptions = {}
) {
  return middleware.bind(null, webhooks, {
    path,
    log,
  } as Required<MiddlewareOptions>);
}
