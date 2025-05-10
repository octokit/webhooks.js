import type { WebhookEventDefinition } from "../../src/types.ts";
import pushEvent from "./push-payload.json";
import installationCreatedEvent from "./installation-created-payload.json";
import installationDeletedEvent from "./installation-deleted-payload.json";

// we have to typecast all the json imports as they're not imported with const,
// meaning TypeScript complains about enum values not being assignable to strings
// @see https://github.com/microsoft/TypeScript/issues/32063

export const pushEventPayload = pushEvent as WebhookEventDefinition<"push">;
export const installationCreatedPayload =
  installationCreatedEvent as WebhookEventDefinition<"installation-created">;
export const installationDeletedPayload =
  installationDeletedEvent as WebhookEventDefinition<"installation-deleted">;
