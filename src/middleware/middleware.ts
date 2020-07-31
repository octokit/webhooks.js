import { isntWebhook } from "./isnt-webhook";
import { getMissingHeaders } from "./get-missing-headers";
import { getPayload } from "./get-payload";
import { verifyAndReceive } from "./verify-and-receive";
import { debug } from "debug";
import { IncomingMessage, ServerResponse } from "http";
import { State } from "../types";
import { EventNames } from "../generated/event-names";

const debugWebhooks = debug("webhooks:receiver");

export function middleware(
  state: State,
  request: IncomingMessage,
  response: ServerResponse,
  next?: Function
): Promise<void> | undefined {
  if (isntWebhook(request, { path: state.path })) {
    // the next callback is set when used as an express middleware. That allows
    // it to define custom routes like /my/custom/page while the webhooks are
    // expected to be sent to the / root path. Otherwise the root path would
    // match all requests and would make it impossible to define custom rooutes
    if (next) {
      next();
      return;
    }

    debugWebhooks(`ignored: ${request.method} ${request.url}`);
    response.statusCode = 404;
    response.end("Not found");
    return;
  }

  const missingHeaders = getMissingHeaders(request).join(", ");
  if (missingHeaders) {
    const error = new Error(`Required headers missing: ${missingHeaders}`);

    return state.eventHandler.receive(error).catch(() => {
      response.statusCode = 400;
      response.end(error.message);
    });
  }

  const eventName = request.headers["x-github-event"] as EventNames.StringNames;
  const signature = request.headers["x-hub-signature"] as string;
  const id = request.headers["x-github-delivery"] as string;

  debugWebhooks(`${eventName} event received (id: ${id})`);

  return getPayload(request)
    .then((payload: any) => {
      return verifyAndReceive(state, {
        id: id,
        name: eventName,
        payload,
        signature,
      });
    })

    .then(() => {
      response.end("ok\n");
    })

    .catch((error) => {
      response.statusCode = error.status || 500;
      response.end(error.toString());
    });
}
