import { verify } from "../verify/index";
import { State, WebhookEvent } from "../types";

export function verifyAndReceive(
  state: State,
  event: WebhookEvent & { signature: string }
): any {
  // verify will validate that the secret is not undefined
  const matchesSignature = verify(
    state.secret!,
    event.payload,
    event.signature
  );

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
    payload: event.payload,
  });
}
