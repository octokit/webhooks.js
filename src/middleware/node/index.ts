import { createLogger } from "../../createLogger";
import { Webhooks } from "../../index";
import { middleware } from "./middleware";
import { onUnhandledRequestDefault } from "./on-unhandled-request-default";
import { MiddlewareOptions } from "./types";

export function createNodeMiddleware(
  webhooks: Webhooks,
  {
    path = "/api/github/webhooks",
    onUnhandledRequest = onUnhandledRequestDefault,
    log = createLogger(),
  }: MiddlewareOptions = {}
) {
  return middleware.bind(null, webhooks, {
    path,
    onUnhandledRequest,
    log,
  } as Required<MiddlewareOptions>);
}
