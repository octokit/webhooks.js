import { createEventHandler } from "./event-handler";
import { middleware } from "./middleware/middleware";
import { sign } from "./sign";
import { verify } from "./verify";
import { verifyAndReceive } from "./middleware/verify-and-receive";
import { EventHandlerOptions, EventState } from "./index.d";

export function createWebhooksApi(options: EventHandlerOptions) {
  if (!options || !options.secret) {
    throw new Error("options.secret required");
  }

  const state: EventState = {
    eventHandler: createEventHandler(options),
    path: options.path || "/",
    secret: options.secret,
    hooks: {},
  };

  return {
    sign: sign.bind(null, options.secret),
    verify: verify.bind(null, options.secret),
    on: state.eventHandler.on,
    removeListener: state.eventHandler.removeListener,
    receive: state.eventHandler.receive,
    middleware: middleware.bind(null, state),
    verifyAndReceive: verifyAndReceive.bind(null, state),
  };
}
