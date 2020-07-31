import { receiverOn as on } from "./on";
import { receiverHandle as receive } from "./receive";
import { removeListener } from "./remove-listener";
import { Options, State } from "../types";

export function createEventHandler(options: Options) {
  const state: State = {
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
