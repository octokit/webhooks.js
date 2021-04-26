import { createLogger } from "./createLogger.js";
import { createEventHandler } from "./event-handler/index.js";
import { sign, verify } from "@octokit/webhooks-methods";
import { verifyAndReceive } from "./verify-and-receive.js";
import type {
  EmitterWebhookEvent,
  EmitterWebhookEventName,
  HandlerFunction,
  RemoveHandlerFunction,
  Options,
  State,
  WebhookError,
  WebhookEventHandlerError,
  EmitterWebhookEventWithStringPayloadAndSignature,
} from "./types.ts";

export { createNodeMiddleware } from "./middleware/node/index.js";
export { emitterEventNames } from "./generated/webhook-names.js";

// U holds the return value of `transform` function in Options
class Webhooks<TTransformed = unknown> {
  public sign: (payload: string) => Promise<string>;
  public verify: (eventPayload: string, signature: string) => Promise<boolean>;
  public on: <E extends EmitterWebhookEventName>(
    event: E | E[],
    callback: HandlerFunction<E, TTransformed>,
  ) => void;
  public onAny: (
    callback: (event: EmitterWebhookEvent & TTransformed) => any,
  ) => void;
  public onError: (
    callback: (event: WebhookEventHandlerError<TTransformed>) => any,
  ) => void;
  public removeListener: <E extends EmitterWebhookEventName | "*">(
    event: E | E[],
    callback: RemoveHandlerFunction<E, TTransformed>,
  ) => void;
  public receive: (event: EmitterWebhookEvent) => Promise<void>;
  public verifyAndReceive: (
    options: EmitterWebhookEventWithStringPayloadAndSignature,
  ) => Promise<void>;

  constructor(options: Options<TTransformed> & { secret: string }) {
    if (!options || !options.secret) {
      throw new Error("[@octokit/webhooks] options.secret required");
    }

    const state: State & { secret: string } = {
      eventHandler: createEventHandler(options),
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
    this.verifyAndReceive = verifyAndReceive.bind(null, state);
  }
}

export {
  createEventHandler,
  Webhooks,
  type EmitterWebhookEvent,
  type EmitterWebhookEventName,
  type WebhookError,
};
