import { Webhooks } from "../../index";
import { middleware } from "./middleware";
import { onUnhandledRequestDefault } from "./on-unhandled-request-default";
import { MiddlewareOptions } from "./types";

export function createNodeMiddleware(
  webhooks: Webhooks,
  {
    path = "/api/github/webhooks",
    onUnhandledRequest = onUnhandledRequestDefault,
  }: MiddlewareOptions = {}
) {
  return middleware.bind(null, webhooks, {
    path,
    onUnhandledRequest,
  } as Required<MiddlewareOptions>);
}
