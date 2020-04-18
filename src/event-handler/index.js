import { receiverOn as on } from "./on";
import { receiverHandle as receive } from "./receive";
import { removeListener } from "./remove-listener";

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
