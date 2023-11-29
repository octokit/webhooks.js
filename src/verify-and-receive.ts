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
    // @ts-expect-error verify uses createHmac, which can take Strings and Buffers
    event.payload,
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

  // The body is already an Object (e.g. GCF) and can be passed directly to the EventHandler
  if (event.body) {
    return state.eventHandler.receive({
      id: event.id,
      name: event.name,
      payload: event.body as EmitterWebhookEvent["payload"],
    });
  }

  let payload;

  try {
    payload =
      typeof event.payload === "string"
        ? JSON.parse(event.payload)
        : JSON.parse(event.payload.toString("utf8"));
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
