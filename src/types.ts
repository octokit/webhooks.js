import type { RequestError } from "@octokit/request-error";
import type { webhooks as OpenAPIWebhooks } from "@wolfy1339/openapi-webhooks-types";
import type { webhooksIdentifiers } from "./generated/webhook-identifiers";
import type { Logger } from "./createLogger";
import type { emitterEventNames } from "./generated/webhook-names";

type SnakeCaseToKebabCase<TString extends string> =
  TString extends `${infer TPart1}_${infer TRest}`
    ? `${TPart1}-${SnakeCaseToKebabCase<TRest>}`
    : TString;

export type WebhookEventName = keyof OpenAPIWebhooks;
export type ExtractEvents<TEventName> =
  TEventName extends `${infer _TWebhookEvent}.${infer _TAction}`
    ? never
    : TEventName;
export type WebhookEvents = ExtractEvents<EmitterWebhookEventName>;
export type WebhookEventDefinition<TEventName extends WebhookEventName> =
  OpenAPIWebhooks[TEventName]["post"]["requestBody"]["content"]["application/json"];

export type EmitterWebhookEventName = (typeof emitterEventNames)[number];
export type EmitterWebhookEvent<
  TEmitterEvent extends EmitterWebhookEventName = EmitterWebhookEventName
> = TEmitterEvent extends `${infer TWebhookEvent}.${infer TAction}`
  ? OpenAPIWebhookEvent<
      Extract<
        `${SnakeCaseToKebabCase<TWebhookEvent>}-${TAction}`,
        WebhookEventName
      >,
      TEmitterEvent
    >
  : BaseWebhookEvent<
      Extract<SnakeCaseToKebabCase<TEmitterEvent>, keyof webhooksIdentifiers>,
      TEmitterEvent
    >;

export type EmitterWebhookEventWithStringPayloadAndSignature = {
  id: string;
  name: EmitterWebhookEventName;
  payload: string;
  signature: string;
};

interface BaseWebhookEvent<
  TKeyName extends keyof webhooksIdentifiers,
  TName extends EmitterWebhookEventName
> {
  id: string;
  name: TName;
  payload: webhooksIdentifiers[TKeyName];
}
interface OpenAPIWebhookEvent<
  TKeyName extends WebhookEventName,
  TName extends EmitterWebhookEventName
> {
  id: string;
  name: TName;
  payload: WebhookEventDefinition<TKeyName>;
}

export interface Options<TTransformed = unknown> {
  secret?: string;
  transform?: TransformMethod<TTransformed>;
  log?: Partial<Logger>;
}

type TransformMethod<T> = (event: EmitterWebhookEvent) => T | PromiseLike<T>;

export type HandlerFunction<
  TName extends EmitterWebhookEventName,
  TTransformed
> = (event: EmitterWebhookEvent<TName> & TTransformed) => any;

export type RemoveHandlerFunction<
  TName extends EmitterWebhookEventName | "*",
  TTransformed
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
  implements Iterable<T>
{
  readonly name: "AggregateError";
  constructor(errors: ReadonlyArray<T | { [key: string]: any } | string>);

  [Symbol.iterator](): IterableIterator<T>;
}
