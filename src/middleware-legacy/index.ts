import { debug } from "debug";
import { createLogger } from "../createLogger";
import { createEventHandler } from "../event-handler/index";
import { middleware } from "./middleware";
import { Options, State } from "../types";

export function createMiddleware(options: Options & { secret: string }) {
  if (!options || !options.secret) {
    throw new Error("[@octokit/webhooks] options.secret required");
  }

  const state: State & { secret: string } = {
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
