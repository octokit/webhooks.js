import { createEventHandler } from "../event-handler/index";
import { middleware } from "./middleware";
import { Options, State } from "../types";

export function createMiddleware(options: Options<any>) {
  if (!options || !options.secret) {
    throw new Error("[@octokit/webhooks] options.secret required");
  }

  const state: State = {
    eventHandler: createEventHandler(options),
    path: options.path || "/",
    secret: options.secret,
    hooks: {},
  };

  const api: any = middleware.bind(null, state);

  api.on = state.eventHandler.on;
  api.removeListener = state.eventHandler.removeListener;

  return api;
}
