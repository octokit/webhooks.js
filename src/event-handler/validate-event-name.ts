import type { Logger } from "../create-logger.ts";
import { emitterEventNames } from "../generated/webhook-names.ts";

type EventName = (typeof emitterEventNames)[number];

type ValidateEventNameOptions =
  | {
      onUnknownEventName?: undefined | "throw";
    }
  | {
      onUnknownEventName: "warn";
      log?: Pick<Logger, "warn">;
    };

export function validateEventName<
  O extends ValidateEventNameOptions = ValidateEventNameOptions,
>(
  eventName: EventName | (string & Record<never, never>),
  options: O = {} as O,
): asserts eventName is O extends { onUnknownEventName: "warn" }
  ? Exclude<string, "*" | "error">
  : EventName {
  if (typeof eventName !== "string") {
    throw new TypeError("eventName must be of type string");
  }
  if (eventName === "*") {
    throw new TypeError(
      `Using the "*" event with the regular Webhooks.on() function is not supported. Please use the Webhooks.onAny() method instead`,
    );
  }
  if (eventName === "error") {
    throw new TypeError(
      `Using the "error" event with the regular Webhooks.on() function is not supported. Please use the Webhooks.onError() method instead`,
    );
  }

  if (!emitterEventNames.includes(eventName as EventName)) {
    if (options.onUnknownEventName !== "warn") {
      throw new TypeError(
        `"${eventName}" is not a known webhook name (https://developer.github.com/v3/activity/events/types/)`,
      );
    } else {
      (options.log || console).warn(
        `"${eventName}" is not a known webhook name (https://developer.github.com/v3/activity/events/types/)`,
      );
    }
  }
}
