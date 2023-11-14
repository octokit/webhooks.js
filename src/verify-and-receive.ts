import { verify } from "@octokit/webhooks-methods";

import { toNormalizedJsonString } from "./to-normalized-json-string";
import type {
  EmitterWebhookEventWithStringPayloadAndSignature,
  EmitterWebhookEventWithSignature,
  State,
} from "./types";

export async function verifyAndReceive(
  state: State & { secret: string },
  event:
    | EmitterWebhookEventWithStringPayloadAndSignature
    | EmitterWebhookEventWithSignature
): Promise<any> {
  // verify will validate that the secret is not undefined
  const matchesSignature = await verify(
    state.secret,
    typeof event.payload === "object"
      ? toNormalizedJsonString(event.payload)
      : event.payload,
    event.signature
  ).catch(() => false);

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
    payload:
      typeof event.payload === "string"
        ? JSON.parse(event.payload)
        : event.payload,
  });
}
