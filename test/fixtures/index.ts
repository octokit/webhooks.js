import {
  InstallationCreatedEvent,
  InstallationDeletedEvent,
  PushEvent,
} from "@octokit/webhooks-types";
import pushEvent from "./push-payload.json";
import installationCreatedEvent from "./installation-created-payload.json";
import installationDeletedEvent from "./installation-deleted-payload.json";

// we have to typecast all the json imports as they're not imported with const,
// meaning TypeScript complains about enum values not being assignable to strings
// @see https://github.com/microsoft/TypeScript/issues/32063

export const pushEventPayload = pushEvent as PushEvent;
export const installationCreatedPayload =
  installationCreatedEvent as InstallationCreatedEvent;
export const installationDeletedPayload =
  installationDeletedEvent as InstallationDeletedEvent;
