import { emitterEventNames } from "../generated/webhook-names";
import {
  EmitterAnyEvent,
  EmitterEventName,
  State,
  WebhookEventHandlerError,
} from "../types";

function handleEventHandlers(
  state: State,
  webhookName: EmitterEventName | "error",
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

  if (webhookNameOrNames === "*") {
    console.warn(
      `Using the "${webhookNameOrNames}" event with the regular Webhooks.on() function is deprecated. Please use the Webhooks.onAny() method instead`
    );
  }

  handleEventHandlers(state, webhookNameOrNames, handler);
}

export function receiverOnAny(
  state: State,
  handler: (event: EmitterAnyEvent) => any
) {
  handleEventHandlers(state, "*", handler);
}

export function receiverOnError(
  state: State,
  handler: (event: WebhookEventHandlerError) => any
) {
  handleEventHandlers(state, "error", handler);
}
