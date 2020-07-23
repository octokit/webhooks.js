import { createEventHandler } from "./event-handler/index";
import { createMiddleware } from "./middleware/index";
import { middleware } from "./middleware/middleware";
import { sign } from "./sign/index";
import { verify } from "./verify/index";
import { verifyAndReceive } from "./middleware/verify-and-receive";
import { EventHandlerOptions, EventState } from "./types";
import { EventNames } from "./generated/types";
import { IncomingMessage, ServerResponse } from "http";

class Webhooks {
  public sign: Function;
  public verify: Function;
  public on: (
    event: EventNames.AllEventTypes | EventNames.AllEventTypes[],
    handler: Function
  ) => void;
  public removeListener: Function;
  public receive: Function;
  public middleware: (
    request: IncomingMessage,
    response: ServerResponse,
    next?: (err?: any) => void
  ) => void | Promise<void>;
  public verifyAndReceive: Function;

  constructor(options?: EventHandlerOptions) {
    if (!options || !options.secret) {
      throw new Error("options.secret required");
    }

    const state: EventState = {
      eventHandler: createEventHandler(options),
      path: options.path || "/",
      secret: options.secret,
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

export { EventNames, EventPayloads } from "./generated/types";

export {
  createEventHandler,
  createMiddleware,
  createWebhooksApi,
  Webhooks,
  sign,
  verify,
};
