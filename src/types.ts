import { RequestError } from "@octokit/request-error";
import type {
  WebhookEventMap,
  WebhookEventName,
} from "@octokit/webhooks-definitions/schema";
import { Logger } from "./createLogger";
import type { emitterEventNames } from "./generated/webhook-names";

export type EmitterWebhookEventName = typeof emitterEventNames[number];
export type EmitterWebhookEvent<
  TEmitterEvent extends EmitterWebhookEventName = EmitterWebhookEventName
> = TEmitterEvent extends `${infer TWebhookEvent}.${infer TAction}`
  ? BaseWebhookEvent<Extract<TWebhookEvent, WebhookEventName>> & {
      payload: { action: TAction };
    }
  : BaseWebhookEvent<Extract<TEmitterEvent, WebhookEventName>>;

interface BaseWebhookEvent<TName extends WebhookEventName> {
  id: string;
  name: TName;
  payload: WebhookEventMap[TName];
}

export interface Options<
  E extends EmitterWebhookEventName,
  TTransformed extends EmitterWebhookEvent<E>
> {
  path?: string;
  secret?: string;
  transform?: TransformMethod<TTransformed>;
  log?: Partial<Logger>;
}

type TransformMethod<T> = (event: EmitterWebhookEvent) => T | PromiseLike<T>;

export type HandlerFunction<
  TName extends EmitterWebhookEventName,
  TTransform
> = (
  event: TTransform extends TransformMethod<infer T>
    ? T
    : EmitterWebhookEvent<TName>
) => any;

type Hooks = {
  [key: string]: Function[];
};

export interface State extends Options<any, any> {
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
  implements Iterable<T> {
  readonly name: "AggregateError";
  constructor(errors: ReadonlyArray<T | { [key: string]: any } | string>);

  [Symbol.iterator](): IterableIterator<T>;
}
