import { All } from "../generated/get-webhook-payload-type-from-event";
import { webhookNames } from "../generated/webhook-names";
import { Handler, State } from "../types";

export function receiverOn<T extends All>(
  state: State<T>,
  webhookNameOrNames: T | T[],
  handler: Handler<T>
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
