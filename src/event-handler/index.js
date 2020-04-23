// "use strict";

const { deprecate } = require("util");
module.exports = deprecate(
  createEventHandler,
  "const createEventHandler = require('@octokit/webhooks/event-handler') is deprecated. Use const { createEventHandler } = require('@octokit/webhooks')"
);

const on = require("./on");
const receive = require("./receive");
const removeListener = require("./remove-listener");

function createEventHandler(options) {
  const state = {
    hooks: {},
  };

  if (options && options.transform) {
    state.transform = options.transform;
  }

  return {
    on: on.bind(null, state),
    removeListener: removeListener.bind(null, state),
    receive: receive.bind(null, state),
  };
}

module.exports.createEventHandler = createEventHandler;
