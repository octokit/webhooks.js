import { createLogger } from "../createLogger";
import type {
  EmitterWebhookEvent,
  EmitterWebhookEventName,
  HandlerFunction,
  Options,
  State,
  WebhookEventHandlerError,
} from "../types";
import {
  receiverOn as on,
  receiverOnAny as onAny,
  receiverOnError as onError,
} from "./on";
import { receiverHandle as receive } from "./receive";
import { removeListener } from "./remove-listener";

interface EventHandler<TTransformed> {
  on<E extends EmitterWebhookEventName>(
    event: E | E[],
    callback: HandlerFunction<E, TTransformed>,
  ): void;
  onAny(handler: (event: EmitterWebhookEvent & TTransformed) => any): void;
  onError(
    handler: (event: WebhookEventHandlerError<TTransformed>) => any,
  ): void;
  removeListener<E extends EmitterWebhookEventName>(
    event: E | E[],
    callback: HandlerFunction<E, TTransformed>,
  ): void;
  receive(event: EmitterWebhookEvent): Promise<void>;
}

export function createEventHandler<TTransformed>(
  options: Options<TTransformed>,
): EventHandler<TTransformed> {
  const state: State = {
    hooks: {},
    log: createLogger(options && options.log),
  };

  if (options && options.transform) {
    state.transform = options.transform;
  }

  return {
    on: on.bind(null, state),
    onAny: (onAny<TTransformed>).bind(null, state),
    onError: (onError<TTransformed>).bind(null, state),
    removeListener: removeListener.bind(null, state),
    receive: receive.bind(null, state),
  };
}
