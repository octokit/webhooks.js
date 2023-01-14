import { createLogger } from "./createLogger";
import { createEventHandler } from "./event-handler/index";
import { sign } from "./sign";
import { verify } from "./verify";
import { verifyAndReceive } from "./verify-and-receive";
import {
  EmitterWebhookEvent,
  EmitterWebhookEventName,
  HandlerFunction,
  RemoveHandlerFunction,
  Options,
  State,
  WebhookError,
  WebhookEventHandlerError,
  EmitterWebhookEventWithStringPayloadAndSignature,
  EmitterWebhookEventWithSignature,
} from "./types";

export { createNodeMiddleware } from "./middleware/node/index";
export { emitterEventNames } from "./generated/webhook-names";

export type Iverify = {
  /** @deprecated Passing a JSON payload object to `verify()` is deprecated and the functionality will be removed in a future release of `@octokit/webhooks`. */
  (eventPayload: object, signature: string): Promise<boolean>;
  (eventPayload: string, signature: string): Promise<boolean>;
};
export type IverifyAndReceive = {
  /** @deprecated Passing a JSON payload object to `verifyAndReceive()` is deprecated and the functionality will be removed in a future release of `@octokit/webhooks`. */
  (options: EmitterWebhookEventWithSignature): Promise<void>;
  (options: EmitterWebhookEventWithStringPayloadAndSignature): Promise<void>;
};

// U holds the return value of `transform` function in Options
class Webhooks<TTransformed = unknown> {
  public sign: (payload: string | object) => Promise<string>;
  public verify: Iverify;
  public on: <E extends EmitterWebhookEventName>(
    event: E | E[],
    callback: HandlerFunction<E, TTransformed>
  ) => void;
  public onAny: (callback: (event: EmitterWebhookEvent) => any) => void;
  public onError: (callback: (event: WebhookEventHandlerError) => any) => void;
  public removeListener: <E extends EmitterWebhookEventName | "*">(
    event: E | E[],
    callback: RemoveHandlerFunction<E, TTransformed>
  ) => void;
  public receive: (event: EmitterWebhookEvent) => Promise<void>;
  public verifyAndReceive: IverifyAndReceive;

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
    this.verify = (eventPayload: object | string, signature: string) => {
      if (typeof eventPayload === "object") {
        console.warn(
          "[@octokit/webhooks] Passing a JSON payload object to `verify()` is deprecated and the functionality will be removed in a future release of `@octokit/webhooks`"
        );
      }
      return verify(options.secret, eventPayload, signature);
    };
    this.on = state.eventHandler.on;
    this.onAny = state.eventHandler.onAny;
    this.onError = state.eventHandler.onError;
    this.removeListener = state.eventHandler.removeListener;
    this.receive = state.eventHandler.receive;
    this.verifyAndReceive = (
      options:
        | EmitterWebhookEventWithStringPayloadAndSignature
        | EmitterWebhookEventWithSignature
    ) => {
      if (typeof options.payload === "object") {
        console.warn(
          "[@octokit/webhooks] Passing a JSON payload object to `verifyAndReceive()` is deprecated and the functionality will be removed in a future release of `@octokit/webhooks`"
        );
      }
      return verifyAndReceive(state, options);
    };
  }
}

export {
  createEventHandler,
  Webhooks,
  EmitterWebhookEvent,
  EmitterWebhookEventName,
  WebhookError,
};
