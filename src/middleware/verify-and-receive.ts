import { verify } from "../verify/index";
import { State } from "../types";
import {
  All,
  EventTypesPayload,
} from "../generated/get-webhook-payload-type-from-event";

export function verifyAndReceive<T extends All>(
  state: State<T>,
  event: EventTypesPayload[T] & { signature: string }
) {
  const matchesSignature = verify(state.secret, event.payload, event.signature);

  if (!matchesSignature) {
    const error = new Error(
      "signature does not match event payload and secret"
    );

    return state.eventHandler.receive(
      Object.assign(error, { event, status: 400 })
    );
  }

  return state.eventHandler.receive({
    id: event.id,
    name: event.name,
    payload: event.payload,
  });
}
