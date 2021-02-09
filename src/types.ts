import { RequestError } from "@octokit/request-error";
import type {
  WebhookEventMap,
  WebhookEventName,
} from "@octokit/webhooks-definitions/schema";
import type { emitterEventNames } from "./generated/webhook-names";

export type EmitterEventName = typeof emitterEventNames[number];
export type EmitterEvent<
  TEmitterEvent extends EmitterEventName = EmitterEventName
> = TEmitterEvent extends `${infer TWebhookEvent}.${infer TAction}`
  ? BaseEmitterEvent<Extract<TWebhookEvent, WebhookEventName>> & {
      payload: { action: TAction };
    }
  : BaseEmitterEvent<Extract<TEmitterEvent, WebhookEventName>>;

interface BaseEmitterEvent<TName extends WebhookEventName> {
  id: string;
  name: TName;
  payload: WebhookEventMap[TName];
}

export interface Options<T extends EmitterEvent, TTransformed = unknown> {
  path?: string;
  secret?: string;
  transform?: TransformMethod<T, TTransformed>;
}

type TransformMethod<T extends EmitterEvent, V = T> = (
  event: EmitterEvent
) => V | PromiseLike<V>;

export type HandlerFunction<TName extends EmitterEventName, TTransformed> = (
  event: EmitterEvent<TName> & TTransformed
) => any;

type Hooks = {
  [key: string]: Function[];
};

export interface State extends Options<any> {
  eventHandler?: any;
  hooks: Hooks;
}

/**
 * Error object with optional properties coming from `octokit.request` errors
 */
export type WebhookError = Error & Partial<RequestError>;

export interface EmitterError extends AggregateError<WebhookError> {
  event: EmitterEvent;
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
