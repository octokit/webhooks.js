import { createEventHandler } from "../event-handler/index";
import { middleware } from "./middleware";
import { Options, State } from "../types";
import { All } from "../generated/get-webhook-payload-type-from-event";
// fixme this returns any :/
export function createMiddleware<T extends All>(options: Options<T>) {
  if (!options || !options.secret) {
    throw new Error("options.secret required");
  }

  const state: State<T> = {
    eventHandler: createEventHandler(options),
    path: options.path || "/",
    secret: options.secret,
    hooks: {},
  };

  const api = middleware.bind(null, state);

  api.on = state.eventHandler.on;
  api.removeListener = state.eventHandler.removeListener;

  return api;
}
