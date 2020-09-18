// @ts-ignore to address #245
import AggregateError from "aggregate-error";

import { wrapErrorHandler } from "./wrap-error-handler";
import {
  WebhookEvent,
  State,
  WebhookError,
  WebhookEventHandlerError,
} from "../types";
import { EventNames } from "../generated/event-names";

function getHooks(
  state: State,
  eventPayloadAction: string,
  eventName: EventNames.StringNames
): Function[] {
  const hooks = [state.hooks[`${eventName}.${eventPayloadAction}`]];

  if (Array.isArray(eventName)) {
    eventName.forEach((name) => hooks.push(state.hooks[name]));
  } else {
    hooks.push(state.hooks[eventName]);
  }

  hooks.push(state.hooks["*"]);

  // @ts-ignore
  return [].concat(...hooks.filter(Boolean));
}

// main handler function
export function receiverHandle(state: State, event: WebhookEvent) {
  const errorHandlers = state.hooks.error || [];

  if (event instanceof Error) {
    const error = Object.assign(new AggregateError([event]), {
      event,
      errors: [event],
    });

    errorHandlers.forEach((handler) => wrapErrorHandler(handler, error));
    return Promise.reject(error);
  }

  if (!event || !event.name) {
    throw new AggregateError(["Event name not passed"]);
  }

  if (!event.payload) {
    throw new AggregateError(["Event payload not passed"]);
  }

  // flatten arrays of event listeners and remove undefined values
  const hooks = getHooks(state, event.payload.action, event.name);

  if (hooks.length === 0) {
    return Promise.resolve();
  }

  const errors: WebhookError[] = [];
  const promises = hooks.map((handler: Function) => {
    let promise = Promise.resolve(event);

    if (state.transform) {
      promise = promise.then(state.transform);
    }

    return promise
      .then((event) => {
        return handler(event);
      })

      .catch((error) => errors.push(Object.assign(error, { event })));
  });

  return Promise.all(promises).then(() => {
    if (errors.length === 0) {
      return;
    }

    const error = new AggregateError(errors) as WebhookEventHandlerError;
    Object.assign(error, {
      event,
      errors,
    });

    errorHandlers.forEach((handler) => wrapErrorHandler(handler, error));

    throw error;
  });
}
