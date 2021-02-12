import type {
  EmitterWebhookEvent,
  EmitterWebhookEventName,
  HandlerFunction,
  Logger,
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
    callback: HandlerFunction<E, TTransformed>
  ): void;
  onAny(handler: (event: EmitterWebhookEvent) => any): void;
  onError(handler: (event: WebhookEventHandlerError) => any): void;
  removeListener<E extends EmitterWebhookEventName>(
    event: E | E[],
    callback: HandlerFunction<E, TTransformed>
  ): void;
  receive(event: EmitterWebhookEvent): Promise<void>;
}

export function createEventHandler<TTransformed>(
  options: Options<any, TTransformed>
): EventHandler<TTransformed> {
  const state: State = {
    hooks: {},
    log: createLogger(options.log),
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

export function createLogger(logger?: Partial<Logger>) {
  return {
    debug: () => {},
    info: /* istanbul ignore next: unused */ () => {},
    warn: console.warn.bind(console),
    error: console.error.bind(console),
    ...logger,
  };
}
