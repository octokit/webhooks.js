"use strict";

const { deprecate } = require("util");

module.exports = deprecate(
  createMiddleware,
  "src/middleware/index.js is deprecated. Use lib/index.js instead."
);

const { createEventHandler } = require("../event-handler");
const middleware = require("./middleware");

function createMiddleware(options) {
  if (!options || !options.secret) {
    throw new Error("options.secret required");
  }

  const state = {
    eventHandler: createEventHandler(options),
    path: options.path || "/",
    secret: options.secret,
  };

  const api = middleware.bind(null, state);

  api.on = state.eventHandler.on;
  api.removeListener = state.eventHandler.removeListener;

  return api;
}

module.exports.createMiddleware = createMiddleware;
