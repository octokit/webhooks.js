import { createEventHandler } from "./event-handler/index";
import { createMiddleware } from "./middleware/index";
import { middleware } from "./middleware/middleware";
import { sign } from "./sign/index";
import { verify } from "./verify/index";
import { verifyAndReceive } from "./middleware/verify-and-receive";
import {
  Options,
  State,
  WebhookEvent,
  WebhookError,
  EventHandler,
} from "./types";
import {
  All,
  AllPayloadTypes,
  EventTypesPayload,
} from "./generated/get-webhook-payload-type-from-event";
import { IncomingMessage, ServerResponse } from "http";

class Webhooks<T extends All> {
  sign: (payload: string | object) => string;
  verify: (eventPayload?: AllPayloadTypes, signature?: string) => boolean;
  on: EventHandler<T>["on"];
  removeListener: EventHandler<T>["removeListener"];
  receive: EventHandler<T>["receive"];
  middleware: (
    request: IncomingMessage,
    response: ServerResponse,
    next?: (err?: any) => void
  ) => void | Promise<void>;
  verifyAndReceive: (
    options: EventTypesPayload[T] & { signature: string }
  ) => Promise<void>;

  constructor(options?: Options<T>) {
    if (!options || !options.secret) {
      throw new Error("options.secret required");
    }

    const state: State<T> = {
      eventHandler: createEventHandler(options),
      path: options.path || "/",
      secret: options.secret,
      // @ts-ignore
      hooks: {},
    };

    this.sign = sign.bind(null, options.secret);
    this.verify = verify.bind(null, options.secret);
    this.on = state.eventHandler.on;
    this.removeListener = state.eventHandler.removeListener;
    this.receive = state.eventHandler.receive;
    this.middleware = middleware.bind(null, state);
    this.verifyAndReceive = verifyAndReceive.bind(null, state);
  }
}

const createWebhooksApi = Webhooks.prototype.constructor;

export { EventPayloads } from "./generated/event-payloads";

export {
  createEventHandler,
  createMiddleware,
  createWebhooksApi,
  Webhooks,
  WebhookEvent,
  WebhookError,
  sign,
  verify,
};
