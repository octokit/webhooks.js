import { receiverOn as on } from "./on";
import { receiverHandle as receive } from "./receive";
import { removeListener } from "./remove-listener";
import { MiddlewareOptions, MiddlewareState } from '..';

export function createEventHandler(options: MiddlewareOptions) {
  const state: MiddlewareState = {
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
