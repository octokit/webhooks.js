import { verifyWithFallback } from "@octokit/webhooks-methods";

import type {
  EmitterWebhookEvent,
  EmitterWebhookEventWithStringPayloadAndSignature,
  State,
  WebhookError,
} from "./types.ts";
import type { EventHandler } from "./event-handler/index.ts";

export async function verifyAndReceive(
  state: State & { secret: string; eventHandler: EventHandler<unknown> },
  event: EmitterWebhookEventWithStringPayloadAndSignature,
): Promise<void> {
  // verify will validate that the secret is not undefined
  const matchesSignature = await verifyWithFallback(
    state.secret,
    event.payload,
    event.signature,
    state.additionalSecrets,
  ).catch(() => false);

  if (!matchesSignature) {
    const error = new Error(
      "[@octokit/webhooks] signature does not match event payload and secret",
    ) as WebhookError;

    error.event = event;
    error.status = 400;

    return state.eventHandler.receive(error);
  }

  let payload: EmitterWebhookEvent["payload"];
  try {
    payload = JSON.parse(event.payload);
  } catch (error: any) {
    error.message = "Invalid JSON";
    error.status = 400;
    throw new AggregateError([error], error.message);
  }

  return state.eventHandler.receive({
    id: event.id,
    name: event.name,
    payload,
  } as EmitterWebhookEvent);
}
