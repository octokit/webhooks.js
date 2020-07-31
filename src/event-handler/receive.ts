import { wrapErrorHandler } from "./wrap-error-handler";
import { WebhookEvent, State } from "../types";
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
    errorHandlers.forEach((handler: Function) =>
      wrapErrorHandler(handler, event)
    );

    return Promise.reject(event);
  }

  if (!event || !event.name) {
    throw new Error("Event name not passed");
  }

  if (!event.payload) {
    throw new Error("Event payload not passed");
  }

  // flatten arrays of event listeners and remove undefined values
  const hooks = getHooks(state, event.payload.action, event.name);

  if (hooks.length === 0) {
    return Promise.resolve();
  }

  const errors: Error[] = [];
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

    errorHandlers.forEach((handler) =>
      errors.forEach(wrapErrorHandler.bind(null, handler))
    );

    const error = Object.assign(new Error("Webhook handler error"), { errors });

    throw error;
  });
}
