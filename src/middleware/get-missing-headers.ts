import { IncomingMessage } from "http";

const WEBHOOK_HEADERS = [
  "x-github-event",
  "x-hub-signature",
  "x-github-delivery",
];

// https://developer.github.com/webhooks/#delivery-headers
export function getMissingHeaders(request: IncomingMessage) {
  return WEBHOOK_HEADERS.filter((header) => !(header in request.headers));
}
