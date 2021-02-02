import { IncomingMessage, ServerResponse } from "http";
import { createEventHandler } from "./event-handler/index";
import { createMiddleware } from "./middleware/index";
import { middleware } from "./middleware/middleware";
import {
  verifyAndReceive,
  WebhookEventName,
} from "./middleware/verify-and-receive";
import { sign } from "./sign/index";
import {
  EmitterAnyEvent,
  EmitterEventName,
  EmitterWebhookEvent,
  EmitterWebhookEventMap,
  HandlerFunction,
  Options,
  State,
  WebhookError,
  WebhookEventHandlerError,
} from "./types";
import { verify } from "./verify/index";

// U holds the return value of `transform` function in Options
class Webhooks<
  E extends EmitterWebhookEvent = EmitterWebhookEvent,
  TTransformed = unknown
> {
  public sign: (payload: string | object) => string;
  public verify: (eventPayload: string | object, signature: string) => boolean;
  public on: <E extends EmitterEventName>(
    event: E | E[],
    callback: HandlerFunction<E, TTransformed>
  ) => void;
  public onAny: (callback: (event: EmitterAnyEvent) => any) => void;
  public onError: (callback: (event: WebhookEventHandlerError) => any) => void;
  public removeListener: <E extends EmitterEventName>(
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
    options: EmitterWebhookEventMap[WebhookEventName] & { signature: string }
  ) => Promise<void>;

  constructor(options?: Options<E>) {
    if (!options || !options.secret) {
      throw new Error("[@octokit/webhooks] options.secret required");
    }

    const state: State = {
      eventHandler: createEventHandler(options),
      path: options.path || "/",
      secret: options.secret,
      hooks: {},
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

const createWebhooksApi = Webhooks.prototype.constructor;

export { EventPayloads } from "./generated/event-payloads";
export {
  EmitterEventMap,
  EmitterEventName,
  EmitterEventMap as EventTypesPayload,
  EmitterEventName as WebhookEvents,
} from "./types";

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
