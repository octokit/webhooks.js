import type { RequestError } from "@octokit/request-error";
import type { webhooks as OpenAPIWebhooks } from "@octokit/openapi-webhooks-types";
import type { EventPayloadMap } from "./generated/webhook-identifiers.js";
import type { Logger } from "./createLogger.js";
import type { EventHandler } from "./event-handler/index.js";
import type { emitterEventNames } from "./generated/webhook-names.js";
import type AggregateError from "aggregate-error";

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
  name: WebhookEventName;
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
  eventHandler?: EventHandler<unknown>;
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
