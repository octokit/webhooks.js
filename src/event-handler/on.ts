import {
  All,
  GetWebhookPayloadTypeFromEvent,
} from "../generated/get-webhook-payload-type-from-event";
import { webhookNames } from "../generated/webhook-names";
import { State } from "../types";

export function receiverOn<E extends All, T = {}>(
  state: State,
  webhookNameOrNames: All | All[],
  handler: (e: GetWebhookPayloadTypeFromEvent<E, T>) => Promise<void> | void
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

  state.hooks[webhookNameOrNames]!.push(handler);
}
