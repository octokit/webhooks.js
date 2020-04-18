import { verify } from "../verify";
import { MiddlewareState, MiddlewareEvent } from "./index.d";

export function verifyAndReceive(state: MiddlewareState, event: MiddlewareEvent): any {
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
