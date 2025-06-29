import type { Logger } from "../create-logger.ts";
import { emitterEventNames } from "../generated/webhook-names.ts";
import type { EmitterWebhookEventName } from "../types.ts";

type ValidateEventNameOptions =
  | {
      onUnknownEventName?: undefined | "throw";
    }
  | {
      onUnknownEventName: "ignore";
    }
  | {
      onUnknownEventName: "warn";
      log?: Pick<Logger, "warn">;
    };

export function validateEventName<
  TOptions extends ValidateEventNameOptions = ValidateEventNameOptions,
>(
  eventName: EmitterWebhookEventName | (string & Record<never, never>),
  options: TOptions = {} as TOptions,
): asserts eventName is TOptions extends { onUnknownEventName: "throw" }
  ? EmitterWebhookEventName
  : Exclude<string, "*" | "error"> {
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

  if (options.onUnknownEventName === "ignore") {
    return;
  }

  if (!emitterEventNames.includes(eventName as EmitterWebhookEventName)) {
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
