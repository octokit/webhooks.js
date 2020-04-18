import { wrapErrorHandler } from "./wrap-error-handler";
import { WebhookEvent, EventState } from '..'

// main handler function
export function receiverHandle(state: EventState, event: WebhookEvent) {
  const errorHandlers = state.hooks.error || [];

  if (event instanceof Error) {
    errorHandlers.forEach((handler: Function) => wrapErrorHandler(handler, event));

    return Promise.reject(event);
  }

  if (!event || !event.name || Array.isArray(event.name)) {
    throw new Error("Event name not passed");
  }

  if (!event.payload) {
    throw new Error("Event payload not passed");
  }

  // flatten arrays of event listeners and remove undefined values
  const hooks = [
      state.hooks[`${event.name}.${event.payload.action}`],
      state.hooks[event.name],
      state.hooks["*"]
    ]
    .filter(Boolean)
    .flat();

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
