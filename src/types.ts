import type AggregateError from "aggregate-error";
import type { RequestError } from "@octokit/request-error";
import {
  All,
  GetWebhookPayloadTypeFromEvent,
} from "./generated/get-webhook-payload-type-from-event";

export interface WebhookEvent<T> {
  id: string;
  name: All;
  payload: T;
}

export interface Options {
  path?: string;
  secret?: string;
  transform?: (
    value: WebhookEvent<any>
  ) => WebhookEvent<any> | PromiseLike<WebhookEvent<any>>;
}

type Hooks<E extends All = All, T = {}> = Partial<
  {
    [key in All]: ((
      e: GetWebhookPayloadTypeFromEvent<E, T>
    ) => Promise<void> | void)[];
  }
>;

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
    event: WebhookEvent<any>;
  };

export interface WebhookEventHandlerError extends AggregateError<WebhookError> {
  event: WebhookEvent<any>;

  /**
   * @deprecated `error.errors` is deprecated. Use `Array.from(error)`. See https://npm.im/aggregate-error
   */
  errors: WebhookError[];
}
