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
  const deprecateOnUnhandledRequest = (request: any, response: any) => {
    console.warn(
      "[@octokit/webhooks] `onUnhandledRequest()` is deprecated and will be removed in a future release of `@octokit/webhooks`"
    );
    return onUnhandledRequest(request, response);
  };
  return middleware.bind(null, webhooks, {
    path,
    onUnhandledRequest: deprecateOnUnhandledRequest,
    log,
  } as Required<MiddlewareOptions>);
}
