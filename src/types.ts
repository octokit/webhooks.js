import type AggregateError from "aggregate-error";
import type { RequestError } from "@octokit/request-error";
import { All } from "./generated/get-webhook-payload-type-from-event";

export interface WebhookEvent<T = any> {
  id: string;
  name: All;
  payload: T;
}

export interface Options {
  path?: string;
  secret?: string;
  transform?: TransformMethod;
}

type TransformMethod = (event: WebhookEvent) => any | PromiseLike<any>;

type Hooks = {
  [key: string]: Function[];
};

export interface State extends Options {
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
