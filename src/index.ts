import { createLogger } from "./createLogger";
import { createEventHandler } from "./event-handler/index";
import { verifyAndReceive } from "./verify-and-receive";
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

  constructor(options: Options<TTransformed> & { secret: string }) {
    if (!options || !options.secret) {
      throw new Error("[@octokit/webhooks] options.secret required");
    }

    const state: State & { secret: string } = {
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
  }
}

export {
  createEventHandler,
  Webhooks,
  EmitterWebhookEvent,
  WebhookError,
  sign,
  verify,
};
