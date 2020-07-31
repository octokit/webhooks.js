import { webhookNames } from "../generated/webhook-names.js";
import { EventNames } from "../generated/event-names";
import { State } from "../types";

export function receiverOn(
  state: State,
  webhookNameOrNames: EventNames.All | EventNames.All[],
  handler: Function
) {
  if (Array.isArray(webhookNameOrNames)) {
    webhookNameOrNames.forEach((webhookName) =>
      receiverOn(state, webhookName, handler)
    );
    return;
  }

  if (webhookNames.indexOf(webhookNameOrNames) === -1) {
    console.warn(
      `"${webhookNameOrNames}" is not a known webhook name (https://developer.github.com/v3/activity/events/types/)`
    );
  }

  if (!state.hooks[webhookNameOrNames]) {
    state.hooks[webhookNameOrNames] = [];
  }

  state.hooks[webhookNameOrNames].push(handler);
}
