import { createEventHandler } from "../event-handler";
import { middleware } from "./middleware";
import { MiddlewareOptions, MiddlewareState } from "..";

export function createMiddleware(options: MiddlewareOptions) {
  if (!options || !options.secret) {
    throw new Error("options.secret required");
  }

  const state: MiddlewareState = {
    eventHandler: createEventHandler(options),
    path: options.path || "/",
    secret: options.secret,
    hooks: {}
  };

  const api: any = middleware.bind(null, state);

  api.on = state.eventHandler.on;
  api.removeListener = state.eventHandler.removeListener;

  return api;
}
