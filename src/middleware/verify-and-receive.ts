import { verify } from "../verify";
import { EventState, WebhookEvent } from "..";

export function verifyAndReceive(state: EventState, event: WebhookEvent): any {
  const matchesSignature = verify(state.secret, event.payload, event.signature);

  if (!matchesSignature) {
    const error = new Error(
      "signature does not match event payload and secret"
    );

    return state.eventHandler.receive(Object.assign(error, { event, status: 400 }));
  }

  return state.eventHandler.receive({
    id: event.id,
    name: event.name,
    payload: event.payload,
  });
}
