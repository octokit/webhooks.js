// @ts-ignore to address #245
import AggregateError from "aggregate-error";
import type {
  EmitterWebhookEvent,
  EmitterWebhookEventName,
  State,
  WebhookError,
  WebhookEventHandlerError,
} from "../types.js";
import { wrapErrorHandler } from "./wrap-error-handler.js";

type EventAction = Extract<
  EmitterWebhookEvent["payload"],
  { action: string }
>["action"];

function getHooks(
  state: State,
  eventPayloadAction: EventAction | null,
  eventName: EmitterWebhookEventName,
): Function[] {
  const hooks = [state.hooks[eventName], state.hooks["*"]];

  if (eventPayloadAction) {
    hooks.unshift(state.hooks[`${eventName}.${eventPayloadAction}`]);
  }

  return ([] as Function[]).concat(...hooks.filter(Boolean));
}

// main handler function
export function receiverHandle(state: State, event: EmitterWebhookEvent) {
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
  const hooks = getHooks(
    state,
    "action" in event.payload ? event.payload.action : null,
    event.name,
  );

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
