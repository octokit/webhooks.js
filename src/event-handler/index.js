const { deprecate } = require("util");

module.exports = deprecate(
  createEventHandler,
  "src/event-handler/index.js is deprecated. Use lib/index.js instead."
);

const on = require("./on");
const receive = require("./receive");
const removeListener = require("./remove-listener");

export function createEventHandler(options) {
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
