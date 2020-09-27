import { createEventHandler } from "../event-handler/index";
import { middleware } from "./middleware";
import { MiddlewareAPI, Options, State } from "../types";
import { All } from "../generated/get-webhook-payload-type-from-event";

export function createMiddleware<T extends All>(
  options: Options<T>
): MiddlewareAPI<T> {
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

  // @ts-ignore
  const api: MiddlewareAPI<T> = middleware.bind(null, state);

  api.on = state.eventHandler.on;
  api.removeListener = state.eventHandler.removeListener;

  return api;
}
