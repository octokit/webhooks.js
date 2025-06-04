import { createLogger } from "./create-logger.ts";
import {
  createEventHandler,
  type EventHandler,
} from "./event-handler/index.ts";
import { sign, verify } from "@octokit/webhooks-methods";
import { verifyAndReceive } from "./verify-and-receive.ts";
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
import { verifyAndParse } from "./verify-and-parse.ts";

export { createNodeMiddleware } from "./middleware/node/index.ts";
export { createWebMiddleware } from "./middleware/web/index.ts";
export { emitterEventNames } from "./generated/webhook-names.ts";

// U holds the return value of `transform` function in Options
class Webhooks<TTransformed = unknown> {
  public sign: (payload: string) => Promise<string>;
  public verify: (eventPayload: string, signature: string) => Promise<boolean>;
  public on: <E extends EmitterWebhookEventName>(
    event: E | E[],
    callback: HandlerFunction<E, TTransformed>,
  ) => void;
  public onAny: (
    callback: (
      event: TTransformed extends unknown
        ? EmitterWebhookEvent
        : EmitterWebhookEvent & TTransformed,
    ) => any,
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
  verifyAndParse: (
    event: EmitterWebhookEventWithStringPayloadAndSignature,
  ) => Promise<EmitterWebhookEvent | WebhookError>;

  constructor(options: Options<TTransformed> & { secret: string }) {
    if (!options || !options.secret) {
      throw new Error("[@octokit/webhooks] options.secret required");
    }

    const state: State & {
      secret: string;
      additionalSecrets?: string[] | undefined;
      eventHandler: EventHandler<TTransformed>;
    } = {
      eventHandler: createEventHandler(options),
      secret: options.secret,
      additionalSecrets: options.additionalSecrets,
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
    this.verifyAndParse = async (
      event: EmitterWebhookEventWithStringPayloadAndSignature,
    ) => {
      return verifyAndParse(state.secret, event, state.additionalSecrets);
    };
  }
}

export {
  createEventHandler,
  Webhooks,
  type EmitterWebhookEvent,
  type EmitterWebhookEventName,
  type WebhookError,
};
