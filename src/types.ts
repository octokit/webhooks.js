import type { RequestError } from "@octokit/request-error";
import { IncomingMessage, ServerResponse } from "http";
import { createEventHandler } from "./event-handler";
import { receiverOn } from "./event-handler/on";
import { receiverHandle } from "./event-handler/receive";
import { removeListener } from "./event-handler/remove-listener";
import {
  All,
  EventTypesPayload,
} from "./generated/get-webhook-payload-type-from-event";

export interface WebhookEvent<T> {
  id: string;
  name: All;
  payload: T;
}

export interface Options<T extends All> {
  path?: string;
  secret?: string;
  transform?: Transform<T>;
}

export type Transform<T extends All, O = WebhookEvent<EventTypesPayload[T]>> = (
  value: WebhookEvent<EventTypesPayload[T]>
) => O;

export type Handler<T extends All> = (
  arg: ReturnType<Transform<T>>
) => Promise<void> | void;

type Hooks<T extends All> = { [key in All]: Handler<T>[] };

export type EventHandler<T extends All> = {
  on: (webhookNameOrNames: T | T[], handler: Handler<T>) => void;
  removeListener: (
    webhookNameOrNames: All | All[],
    handler: Handler<T>
  ) => ReturnType<typeof removeListener>;
  receive: (
    event:
      | WebhookEvent<EventTypesPayload[T]>
      | (Error & { event: WebhookEvent<EventTypesPayload[T]>; status: number })
      | Error
  ) => ReturnType<typeof receiverHandle>;
};
export interface State<T extends All> extends Options<T> {
  eventHandler: EventHandler<T>;
  hooks: Hooks<T>;
}

type Middleware = (
  request: IncomingMessage,
  response: ServerResponse,
  next?: Function
) => Promise<any> | void;
export interface MiddlewareAPI<T extends All> extends Middleware {
  on: EventHandler<T>["on"];
  removeListener: EventHandler<T>["removeListener"];
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
