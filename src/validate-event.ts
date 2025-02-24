import { emitterEventNames } from "./generated/webhook-names.js";
import type { EmitterWebhookEventName, EmitterWebhookEvent } from "./types.js";

/**
 * Validates if the provided event name or names are a know event name.
 * If validation is successful, the types get narrowed to {@link EmitterWebhookEventName}.
 *
 * @param {string | string[]} event The event name or an array of event names to validate.
 * @returns {event is EmitterWebhookEventName | EmitterWebhookEventName[]} True if the event name(s) are valid, otherwise false.
 */
export function validateEventNameOrNames(
  event: string | string[],
): event is EmitterWebhookEventName | EmitterWebhookEventName[] {
  if (Array.isArray(event)) {
    return event.every((e) =>
      emitterEventNames.includes(e as EmitterWebhookEventName),
    );
  }
  return emitterEventNames.includes(event as EmitterWebhookEventName);
}

/**
 * Validates the structure and type of a webhook payload and narrows the type to the corresponding event type.
 *
 * This function ensures that the provided input matches the expected structure of an event,
 * including a valid event name, an ID, and a payload. If the validation passes, the input is
 * narrowed to the specific {@link EmitterWebhookEvent} type.
 *
 * @template {EmitterWebhookEventName} TName The specific event name to validate against.
 * @param {unknown} input The JSON input to validate and type-cast to the event type.
 * @returns {input is EmitterWebhookEvent<TName>} True if the input is a valid event payload, otherwise false.
 */
export function validatePayload<TName extends EmitterWebhookEventName>(
  input: unknown,
): input is EmitterWebhookEvent<TName> {
  // Ensure the input is an object and has the necessary properties
  if (
    typeof input !== "object" ||
    input === null ||
    !("name" in input) ||
    !("id" in input) ||
    !("payload" in input)
  ) {
    return false;
  }

  const typedInput = input as {
    name: Object | undefined;
    id: Object | undefined;
    payload: Object | undefined;
  };

  if (
    typeof typedInput.name !== "string" ||
    typeof typedInput.id !== "string" ||
    typeof typedInput.payload !== "object" ||
    typedInput.payload === null
  ) {
    return false;
  }

  return validateEventNameOrNames(typedInput.name);
}
