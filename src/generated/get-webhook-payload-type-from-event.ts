import { EventPayloads } from "./event-payloads";
import { WebhookEvent, WebhookEventHandlerError } from "../types";
export interface EventTypesPayload {
  error: WebhookEventHandlerError;
  "*": any;
  check_run: EventPayloads.WebhookPayloadCheckRun;
}
export type All = keyof EventTypesPayload;
export type AllPayloadTypes = EventTypesPayload[keyof Omit<
  EventTypesPayload,
  "*"
>];
