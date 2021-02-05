import { emitterEventNames } from "../generated/webhook-names";
import {
  EmitterEventName,
  EmitterWebhookEvent,
  State,
  WebhookEventHandlerError,
} from "../types";

function handleEventHandlers(
  state: State,
  webhookName: EmitterEventName | "error" | "*",
  handler: Function
) {
  if (!state.hooks[webhookName]) {
    state.hooks[webhookName] = [];
  }

  state.hooks[webhookName].push(handler);
}
export function receiverOn(
  state: State,
  webhookNameOrNames: EmitterEventName | EmitterEventName[],
  handler: Function
) {
  if (Array.isArray(webhookNameOrNames)) {
    webhookNameOrNames.forEach((webhookName) =>
      receiverOn(state, webhookName, handler)
    );
    return;
  }

  if (emitterEventNames.indexOf(webhookNameOrNames) === -1) {
    console.warn(
      `"${webhookNameOrNames}" is not a known webhook name (https://developer.github.com/v3/activity/events/types/)`
    );
  }

  handleEventHandlers(state, webhookNameOrNames, handler);
}

export function receiverOnAny(
  state: State,
  handler: (event: EmitterWebhookEvent) => any
) {
  handleEventHandlers(state, "*", handler);
}

export function receiverOnError(
  state: State,
  handler: (event: WebhookEventHandlerError) => any
) {
  handleEventHandlers(state, "error", handler);
}
