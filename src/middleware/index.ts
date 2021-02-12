import { debug } from "debug";
import { createEventHandler, createLogger } from "../event-handler/index";
import { middleware } from "./middleware";
import { Options, State } from "../types";

export function createMiddleware(options: Options) {
  if (!options || !options.secret) {
    throw new Error("[@octokit/webhooks] options.secret required");
  }

  const state: State = {
    eventHandler: createEventHandler(options),
    path: options.path || "/",
    secret: options.secret,
    hooks: {},
    log: createLogger(options.log || { debug: debug("webhooks:receiver") }),
  };

  const api: any = middleware.bind(null, state);

  api.on = state.eventHandler.on;
  api.removeListener = state.eventHandler.removeListener;

  return api;
}
