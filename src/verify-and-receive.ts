// @ts-ignore to address #245
import AggregateError from "aggregate-error";
import { verify } from "@octokit/webhooks-methods";

import type {
  EmitterWebhookEvent,
  EmitterWebhookEventWithStringPayloadAndSignature,
  State,
} from "./types.js";

export async function verifyAndReceive(
  state: State & { secret: string },
  event: EmitterWebhookEventWithStringPayloadAndSignature,
): Promise<void> {
  // verify will validate that the secret is not undefined
  const matchesSignature = await verify(
    state.secret,
    typeof event.payload === "string"
      ? event.payload
      : JSON.stringify(event.payload),
    event.signature,
  ).catch(() => false);

  if (!matchesSignature) {
    const error = new Error(
      "[@octokit/webhooks] signature does not match event payload and secret",
    );

    return state.eventHandler.receive(
      Object.assign(error, { event, status: 400 }),
    );
  }

  let payload: EmitterWebhookEvent["payload"];
  try {
    payload =
      typeof event.payload === "string"
        ? JSON.parse(event.payload)
        : event.payload;
  } catch (error: any) {
    error.message = "Invalid JSON";
    error.status = 400;
    throw new AggregateError([error]);
  }

  return state.eventHandler.receive({
    id: event.id,
    name: event.name,
    payload,
  });
}
