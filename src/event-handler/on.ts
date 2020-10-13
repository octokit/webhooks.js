import { WebhookEvents } from "../generated/get-webhook-payload-type-from-event";
import { webhookNames } from "../generated/webhook-names";
import { State } from "../types";

export function receiverOn(
  state: State,
  webhookNameOrNames: WebhookEvents | WebhookEvents[],
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

  if (webhookNameOrNames === "*" || webhookNameOrNames === "error") {
    console.warn(
      `Using the "${webhookNameOrNames}" event with the regular Webhooks.on() function is deprecated. Please use either the Webhooks.on${
        webhookNameOrNames.charAt(0).toUpperCase() + webhookNameOrNames.slice(1)
      } method instead`
    );
  }

  if (!state.hooks[webhookNameOrNames]) {
    state.hooks[webhookNameOrNames] = [];
  }

  state.hooks[webhookNameOrNames].push(handler);
}
