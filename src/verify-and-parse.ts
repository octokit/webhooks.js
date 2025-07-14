import { verifyWithFallback } from "@octokit/webhooks-methods";

import type {
  EmitterWebhookEvent,
  EmitterWebhookEventWithStringPayloadAndSignature,
  WebhookError,
} from "./types.ts";

export async function verifyAndParse(
  secret: string,
  event: EmitterWebhookEventWithStringPayloadAndSignature,
  additionalSecrets?: string[] | undefined,
): Promise<EmitterWebhookEvent | WebhookError> {
  // verify will validate that the secret is not undefined
  const matchesSignature = await verifyWithFallback(
    secret,
    event.payload,
    event.signature,
    additionalSecrets,
  ).catch(() => false);

  if (!matchesSignature) {
    const error = new Error(
      "[@octokit/webhooks] signature does not match event payload and secret",
    );

    return Object.assign(error, { event, status: 400 }) as WebhookError;
  }

  let payload: EmitterWebhookEvent["payload"];
  try {
    payload = JSON.parse(event.payload);
  } catch (error: any) {
    error.message = "Invalid JSON";
    error.status = 400;
    throw new AggregateError([error], error.message);
  }

  return {
    id: event.id,
    name: event.name,
    payload,
  } as EmitterWebhookEvent;
}
