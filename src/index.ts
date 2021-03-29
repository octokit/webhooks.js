import { IncomingMessage, ServerResponse } from "http";
import { createLogger } from "./createLogger";
import { createEventHandler } from "./event-handler/index";
import { createMiddleware } from "./middleware-legacy/index";
import { middleware } from "./middleware-legacy/middleware";
import { verifyAndReceive } from "./middleware-legacy/verify-and-receive";
import { sign } from "./sign/index";
import {
  EmitterWebhookEvent,
  EmitterWebhookEventName,
  HandlerFunction,
  Options,
  State,
  WebhookError,
  WebhookEventHandlerError,
} from "./types";
import { verify } from "./verify/index";

export { createNodeMiddleware } from "./middleware/node/index";

// U holds the return value of `transform` function in Options
class Webhooks<TTransformed = unknown> {
  public sign: (payload: string | object) => string;
  public verify: (eventPayload: string | object, signature: string) => boolean;
  public on: <E extends EmitterWebhookEventName>(
    event: E | E[],
    callback: HandlerFunction<E, TTransformed>
  ) => void;
  public onAny: (callback: (event: EmitterWebhookEvent) => any) => void;
  public onError: (callback: (event: WebhookEventHandlerError) => any) => void;
  public removeListener: <E extends EmitterWebhookEventName>(
    event: E | E[],
    callback: HandlerFunction<E, TTransformed>
  ) => void;
  public receive: (event: EmitterWebhookEvent) => Promise<void>;
  public verifyAndReceive: (
    options: EmitterWebhookEvent & { signature: string }
  ) => Promise<void>;

  /**
   * @deprecated use `createNodeMiddleware(webhooks)` instead
   */
  public middleware: (
    request: IncomingMessage,
    response: ServerResponse,
    next?: (err?: any) => void
  ) => void | Promise<void>;

  constructor(options: Options<TTransformed>) {
    if (!options || !options.secret) {
      throw new Error("[@octokit/webhooks] options.secret required");
    }

    const state: State = {
      eventHandler: createEventHandler(options),
      path: options.path || "/",
      secret: options.secret,
      hooks: {},
      log: createLogger(options.log),
    };

    if ("path" in options) {
      state.log.warn(
        "[@octokit/webhooks] `path` option is deprecated and will be removed in a future release of `@octokit/webhooks`. Please use `createNodeMiddleware(webhooks, { path })` instead"
      );
    }

    this.sign = sign.bind(null, options.secret);
    this.verify = verify.bind(null, options.secret);
    this.on = state.eventHandler.on;
    this.onAny = state.eventHandler.onAny;
    this.onError = state.eventHandler.onError;
    this.removeListener = state.eventHandler.removeListener;
    this.receive = state.eventHandler.receive;
    this.verifyAndReceive = verifyAndReceive.bind(null, state);

    this.middleware = function deprecatedMiddleware(
      request: IncomingMessage,
      response: ServerResponse,
      next?: (err?: any) => void
    ) {
      state.log.warn(
        "[@octokit/webhooks] `webhooks.middleware` is deprecated and will be removed in a future release of `@octokit/webhooks`. Please use `createNodeMiddleware(webhooks)` instead"
      );
      return middleware(state, request, response, next);
    };
  }
}

/** @deprecated `createWebhooksApi()` is deprecated and will be removed in a future release of `@octokit/webhooks`, please use the `Webhooks` class instead */
const createWebhooksApi = <TTransformed>(options: Options<TTransformed>) => {
  const log = createLogger(options.log);
  log.warn(
    "[@octokit/webhooks] `createWebhooksApi()` is deprecated and will be removed in a future release of `@octokit/webhooks`, please use the `Webhooks` class instead"
  );
  return new Webhooks<TTransformed>(options);
};

export {
  createEventHandler,
  createMiddleware,
  createWebhooksApi,
  Webhooks,
  EmitterWebhookEvent,
  WebhookError,
  sign,
  verify,
};
