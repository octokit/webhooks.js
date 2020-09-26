import { receiverOn as on } from "./on";
import { receiverHandle as receive } from "./receive";
import { removeListener } from "./remove-listener";
import { Options, State } from "../types";
import { All } from "../generated/get-webhook-payload-type-from-event";

const identity = <T>(arg: T) => arg;

export function createEventHandler<T extends All>(options: Options<T>) {
  const state: State<T> = {
    hooks: {},
    transform: options.transform || identity,
  };

  return {
    on: on.bind(null, state),
    removeListener: removeListener.bind(null, state),
    receive: receive.bind(null, state),
  };
}
