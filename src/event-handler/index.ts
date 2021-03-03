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

interface EventHandler<T extends Options> {
  on<E extends EmitterWebhookEventName>(
    event: E | E[],
    callback: HandlerFunction<E, T["transform"]>
  ): void;
  onAny(handler: (event: EmitterWebhookEvent) => any): void;
  onError(handler: (event: WebhookEventHandlerError) => any): void;
  removeListener<E extends EmitterWebhookEventName>(
    event: E | E[],
    callback: HandlerFunction<E, T["transform"]>
  ): void;
  receive(event: EmitterWebhookEvent): Promise<void>;
}

export function createEventHandler<T extends Options>(
  options?: T
): EventHandler<T> {
  const state: State = {
    hooks: {},
    log: createLogger(options && options.log),
  };

  if (options && options.transform) {
    state.transform = options.transform;
  }

  return {
    on: on.bind(null, state),
    onAny: onAny.bind(null, state),
    onError: onError.bind(null, state),
    removeListener: removeListener.bind(null, state),
    receive: receive.bind(null, state),
  };
}
