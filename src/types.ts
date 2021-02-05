import type { RequestError } from "@octokit/request-error";
import type { EmitterEventWebhookPayloadMap } from "./generated/get-webhook-payload-type-from-event";

type EmitterEventPayloadMap = EmitterEventWebhookPayloadMap;

export type EmitterWebhookEventMap = {
  [K in keyof EmitterEventPayloadMap]: BaseWebhookEvent<K>;
};

export type EmitterWebhookEventName = keyof EmitterWebhookEventMap;
export type EmitterWebhookEvent = EmitterWebhookEventMap[EmitterWebhookEventName];

/**
 * A map of all possible emitter events to their event type.
 * AKA "if the emitter emits x, the handler will be passed y"
 */
export type EmitterEventMap = EmitterWebhookEventMap;
export type EmitterEventName = keyof EmitterEventMap;
export type EmitterEvent = EmitterEventMap[EmitterEventName];

export type ToWebhookEvent<
  TEmitterEvent extends string
> = TEmitterEvent extends `${infer TWebhookEvent}.${string}`
  ? TWebhookEvent
  : TEmitterEvent;

interface BaseWebhookEvent<
  TName extends keyof EmitterEventPayloadMap = keyof EmitterEventPayloadMap
> {
  id: string;
  name: ToWebhookEvent<TName>;
  payload: EmitterEventPayloadMap[TName];
}

export interface Options<T extends EmitterWebhookEvent> {
  path?: string;
  secret?: string;
  transform?: TransformMethod<T>;
}

type TransformMethod<T extends EmitterWebhookEvent, V = T> = (
  event: EmitterWebhookEvent
) => V | PromiseLike<V>;

type EnsureArray<T> = T extends any[] ? T : [T];
// type MaybeArray<T> = T | T[];

export type HandlerFunction<
  TName extends EmitterEventName | EmitterEventName[],
  TTransformed
> = (
  event: EmitterEventMap[Extract<
    EmitterEventName,
    EnsureArray<TName>[number]
  >] &
    TTransformed
) => any;

type Hooks = {
  [key: string]: Function[];
};

export interface State extends Options<any> {
  eventHandler?: any;
  hooks: Hooks;
}

/**
 * Error object with optional poperties coming from `octokit.request` errors
 */
export type WebhookError = Error &
  Partial<RequestError> & {
    /**
     * @deprecated `error.event` is deprecated. Use the `.event` property on the aggregated error instance
     */
    event: EmitterWebhookEvent;
  };

// todo: rename to "EmitterErrorEvent"
export interface WebhookEventHandlerError extends AggregateError<WebhookError> {
  event: EmitterWebhookEvent;

  /**
   * @deprecated `error.errors` is deprecated. Use `Array.from(error)`. See https://npm.im/aggregate-error
   */
  errors: WebhookError[];
}

/**
 * Workaround for TypeScript incompatibility with types exported by aggregate-error.
 * Credit: https://git.io/JUEEr
 * @copyright Sindre Sorhus
 * @license MIT (https://git.io/JUEEK)
 * @see https://github.com/octokit/webhooks.js/pull/270/files
 */
declare class AggregateError<T extends Error = Error>
  extends Error
  implements Iterable<T> {
  readonly name: "AggregateError";
  constructor(errors: ReadonlyArray<T | { [key: string]: any } | string>);

  [Symbol.iterator](): IterableIterator<T>;
}
