import { IncomingMessage, ServerResponse } from "http";
import { createLogger } from "./createLogger";
import { createEventHandler } from "./event-handler/index";
import { createMiddleware } from "./middleware/index";
import { middleware } from "./middleware/middleware";
import { verifyAndReceive } from "./middleware/verify-and-receive";
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

// U holds the return value of `transform` function in Options
class Webhooks<TTransformed> {
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
  public middleware: (
    request: IncomingMessage,
    response: ServerResponse,
    next?: (err?: any) => void
  ) => void | Promise<void>;
  public verifyAndReceive: (
    options: EmitterWebhookEvent & { signature: string }
  ) => Promise<void>;

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

    this.sign = sign.bind(null, options.secret);
    this.verify = verify.bind(null, options.secret);
    this.on = state.eventHandler.on;
    this.onAny = state.eventHandler.onAny;
    this.onError = state.eventHandler.onError;
    this.removeListener = state.eventHandler.removeListener;
    this.receive = state.eventHandler.receive;
    this.middleware = middleware.bind(null, state);
    this.verifyAndReceive = verifyAndReceive.bind(null, state);
  }
}

/** @deprecated `createWebhooksApi()` is deprecated and will be removed in a future release of `@octokit/webhooks`, please use the `Webhooks` class instead */
const createWebhooksApi = <TTransformed>(options: Options<TTransformed>) => {
  console.error(
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
