import { createLogger } from "../create-logger.ts";
import type {
  EmitterWebhookEvent,
  EmitterWebhookEventName,
  HandlerFunction,
  Options,
  State,
  WebhookError,
  WebhookEventHandlerError,
} from "../types.ts";
import {
  receiverOn as on,
  receiverOnAny as onAny,
  receiverOnError as onError,
} from "./on.ts";
import { receiverHandle as receive } from "./receive.ts";
import { removeListener } from "./remove-listener.ts";

export interface EventHandler<TTransformed = unknown> {
  on<E extends EmitterWebhookEventName>(
    event: E | E[],
    callback: HandlerFunction<E, TTransformed>,
  ): void;
  onAny(
    handler: (
      event: TTransformed extends unknown
        ? EmitterWebhookEvent
        : EmitterWebhookEvent & TTransformed,
    ) => any,
  ): void;
  onError(
    handler: (event: WebhookEventHandlerError<TTransformed>) => any,
  ): void;
  removeListener<E extends EmitterWebhookEventName>(
    event: E | E[],
    callback: HandlerFunction<E, TTransformed>,
  ): void;
  receive(event: EmitterWebhookEvent | WebhookError): Promise<void>;
}

export function createEventHandler<TTransformed = unknown>(
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
