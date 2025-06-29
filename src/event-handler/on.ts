import type {
  EmitterWebhookEvent,
  EmitterWebhookEventName,
  State,
  WebhookEventHandlerError,
} from "../types.ts";
import { validateEventName } from "./validate-event-name.ts";

function handleEventHandlers(
  state: State,
  webhookName: EmitterWebhookEventName | "error" | "*",
  handler: Function,
) {
  if (!state.hooks[webhookName]) {
    state.hooks[webhookName] = [];
  }

  state.hooks[webhookName].push(handler);
}
export function receiverOn(
  state: State,
  webhookNameOrNames: EmitterWebhookEventName | EmitterWebhookEventName[],
  handler: Function,
) {
  if (Array.isArray(webhookNameOrNames)) {
    webhookNameOrNames.forEach((webhookName) =>
      receiverOn(state, webhookName, handler),
    );
    return;
  }

  validateEventName(webhookNameOrNames, {
    onUnknownEventName: "warn",
    log: state.log,
  });

  handleEventHandlers(state, webhookNameOrNames, handler);
}

export function receiverOnAny<TTransformed>(
  state: State,
  handler: (
    event: TTransformed extends unknown
      ? EmitterWebhookEvent
      : EmitterWebhookEvent & TTransformed,
  ) => any,
) {
  handleEventHandlers(state, "*", handler);
}

export function receiverOnError<TTransformed>(
  state: State,
  handler: (event: WebhookEventHandlerError<TTransformed>) => any,
) {
  handleEventHandlers(state, "error", handler);
}
