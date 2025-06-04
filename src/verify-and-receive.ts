import { verifyAndParse } from "./verify-and-parse.ts";
import type {
  EmitterWebhookEventWithStringPayloadAndSignature,
  State,
} from "./types.ts";
import type { EventHandler } from "./event-handler/index.ts";

export async function verifyAndReceive(
  state: State & { secret: string; eventHandler: EventHandler<unknown> },
  event: EmitterWebhookEventWithStringPayloadAndSignature,
): Promise<void> {
  return state.eventHandler.receive(
    await verifyAndParse(state.secret, event, state.additionalSecrets),
  );
}
