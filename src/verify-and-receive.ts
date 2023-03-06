import { verify } from "@octokit/webhooks-methods";

import type {
  EmitterWebhookEventWithStringPayloadAndSignature,
  State,
} from "./types";

export async function verifyAndReceive(
  state: State & { secret: string },
  event: EmitterWebhookEventWithStringPayloadAndSignature
): Promise<any> {
  // verify will validate that the secret is not undefined
  const matchesSignature = await verify(
    state.secret,
    event.payload,
    event.signature
  );

  if (!matchesSignature) {
    const error = new Error(
      "[@octokit/webhooks] signature does not match event payload and secret"
    );

    return state.eventHandler.receive(
      Object.assign(error, { event, status: 400 })
    );
  }

  return state.eventHandler.receive({
    id: event.id,
    name: event.name,
    payload: JSON.parse(event.payload),
  });
}
