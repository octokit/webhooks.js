import type { RequestError } from "@octokit/request-error";
import {
  All,
  EventTypesPayload,
} from "./generated/get-webhook-payload-type-from-event";

export interface WebhookEvent<T = any> {
  id: string;
  name: All;
  payload: T;
}

export interface Options<T extends WebhookEvent> {
  path?: string;
  secret?: string;
  transform?: TransformMethod<T>;
}

type TransformMethod<T extends WebhookEvent, V = T> = (
  event: WebhookEvent
) => V | PromiseLike<V>;

export type HandlerFunction<E extends All, U> = (
  event: EventTypesPayload[E] & U
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
    event: WebhookEvent;
  };

export interface WebhookEventHandlerError extends AggregateError<WebhookError> {
  event: WebhookEvent;

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
