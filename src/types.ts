import type { RequestError } from "@octokit/request-error";
import type { webhooks as OpenAPIWebhooks } from "@wolfy1339/openapi-webhooks-types";
import type { EventPayloadMap } from "./generated/webhook-identifiers.js";
import type { Logger } from "./createLogger.js";
import type { emitterEventNames } from "./generated/webhook-names.js";

export type WebhookEventName = keyof EventPayloadMap;
export type ExtractEvents<TEventName> =
  TEventName extends `${infer _TWebhookEvent}.${infer _TAction}`
    ? never
    : TEventName;
export type WebhookEvents = ExtractEvents<EmitterWebhookEventName>;
export type WebhookEventDefinition<TEventName extends keyof OpenAPIWebhooks> =
  OpenAPIWebhooks[TEventName]["post"]["requestBody"]["content"]["application/json"];

export type EmitterWebhookEventName = (typeof emitterEventNames)[number];
export type EmitterWebhookEvent<
  TEmitterEvent extends EmitterWebhookEventName = EmitterWebhookEventName,
> = TEmitterEvent extends `${infer TWebhookEvent}.${infer TAction}`
  ? BaseWebhookEvent<Extract<TWebhookEvent, WebhookEventName>> & {
      payload: { action: TAction };
    }
  : BaseWebhookEvent<Extract<TEmitterEvent, WebhookEventName>>;

export type EmitterWebhookEventWithStringPayloadAndSignature = {
  id: string;
  name: EmitterWebhookEventName;
  payload: string;
  signature: string;
};

interface BaseWebhookEvent<TName extends WebhookEventName> {
  id: string;
  name: TName;
  payload: EventPayloadMap[TName];
}

export interface Options<TTransformed = unknown> {
  secret?: string;
  transform?: TransformMethod<TTransformed>;
  log?: Partial<Logger>;
}

type TransformMethod<T> = (event: EmitterWebhookEvent) => T | PromiseLike<T>;

export type HandlerFunction<
  TName extends EmitterWebhookEventName,
  TTransformed,
> = (event: EmitterWebhookEvent<TName> & TTransformed) => any;

export type RemoveHandlerFunction<
  TName extends EmitterWebhookEventName | "*",
  TTransformed,
> = (event: EmitterWebhookEvent<Exclude<TName, "*">> & TTransformed) => any;

type Hooks = {
  [key: string]: Function[];
};

export interface State extends Options<any> {
  eventHandler?: any;
  hooks: Hooks;
  log: Logger;
}

/**
 * Error object with optional properties coming from `octokit.request` errors
 */
export type WebhookError = Error & Partial<RequestError>;

// todo: rename to "EmitterErrorEvent"
export interface WebhookEventHandlerError<TTransformed = unknown>
  extends AggregateError<WebhookError> {
  event: TTransformed extends unknown
    ? EmitterWebhookEvent
    : EmitterWebhookEvent & TTransformed;
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
  implements Iterable<T>
{
  readonly name: "AggregateError";
  constructor(errors: ReadonlyArray<T | { [key: string]: any } | string>);

  [Symbol.iterator](): IterableIterator<T>;
}
