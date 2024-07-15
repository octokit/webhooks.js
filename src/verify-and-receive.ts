import { verify } from "@octokit/webhooks-methods";

import type {
  EmitterWebhookEvent,
  EmitterWebhookEventWithStringPayloadAndSignature,
  State,
  WebhookError,
} from "./types.js";
import type { EventHandler } from "./event-handler/index.js";

export async function verifyAndReceive(
  state: State & { secret: string; eventHandler: EventHandler<unknown> },
  event: EmitterWebhookEventWithStringPayloadAndSignature,
): Promise<void> {
  // verify will validate that the secret is not undefined
  const matchesSignature = await verify(
    state.secret,
    event.payload,
    event.signature,
  ).catch(() => false);

  if (!matchesSignature) {
    const error = new Error(
      "[@octokit/webhooks] signature does not match event payload and secret",
    );

    return state.eventHandler.receive(
      Object.assign(error, { event, status: 400 }) as WebhookError,
    );
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
