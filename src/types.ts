import type { RequestError } from "@octokit/request-error";
import type { EmitterEventWebhookPayloadMap } from "./generated/get-webhook-payload-type-from-event";

export type EmitterWebhookEventMap = {
  [K in keyof EmitterEventWebhookPayloadMap]: BaseWebhookEvent<K>;
};

export type EmitterWebhookEventName = keyof EmitterWebhookEventMap;
export type EmitterWebhookEvent = EmitterWebhookEventMap[EmitterWebhookEventName];

type ToWebhookEvent<
  TEmitterEvent extends string
> = TEmitterEvent extends `${infer TWebhookEvent}.${string}`
  ? TWebhookEvent
  : TEmitterEvent;

interface BaseWebhookEvent<
  TName extends EmitterWebhookEventName = EmitterWebhookEventName
> {
  id: string;
  name: ToWebhookEvent<TName>;
  payload: EmitterEventWebhookPayloadMap[TName];
}

export interface Options<
  T extends EmitterWebhookEvent,
  TTransformed = unknown
> {
  path?: string;
  secret?: string;
  transform?: TransformMethod<T, TTransformed>;
}

type TransformMethod<T extends EmitterWebhookEvent, V = T> = (
  event: EmitterWebhookEvent
) => V | PromiseLike<V>;

type EnsureArray<T> = T extends any[] ? T : [T];
// type MaybeArray<T> = T | T[];

export type HandlerFunction<
  TName extends EmitterWebhookEventName | EmitterWebhookEventName[],
  TTransformed
> = (
  event: EmitterWebhookEventMap[Extract<
    EmitterWebhookEventName,
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
export type WebhookError = Error & Partial<RequestError>;

// todo: rename to "EmitterErrorEvent"
export interface WebhookEventHandlerError extends AggregateError<WebhookError> {
  event: EmitterWebhookEvent;
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
