import { verify } from "@octokit/webhooks-methods";

import type {
  EmitterWebhookEventWithStringPayloadAndSignature,
  State,
} from "./types";
import AggregateError from "aggregate-error";

export async function verifyAndReceive(
  state: State & { secret: string },
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
      Object.assign(error, { event, status: 400 }),
    );
  }

  try {
    return state.eventHandler.receive({
      id: event.id,
      name: event.name,
      payload: JSON.parse(event.payload),
    });
  } catch (error: any) {
    error.message = "Invalid JSON";
    error.status = 400;
    let tmpStackTraceLimit = Error.stackTraceLimit;
    Error.stackTraceLimit = 0;
    const aggregateError = new AggregateError([error]);
    Error.stackTraceLimit = tmpStackTraceLimit;
    aggregateError.stack = error.stack;
    throw aggregateError;
  }
}
