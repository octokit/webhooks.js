// remove type imports from http for Deno compatibility
// see https://github.com/octokit/octokit.js/issues/24#issuecomment-817361886
// import { IncomingMessage } from "http";
type IncomingMessage = any;

const WEBHOOK_HEADERS = [
  "x-github-event",
  "x-hub-signature-256",
  "x-github-delivery",
];

// https://docs.github.com/en/developers/webhooks-and-events/webhook-events-and-payloads#delivery-headers
export function getMissingHeaders(request: IncomingMessage) {
  return WEBHOOK_HEADERS.filter((header) => !(header in request.headers));
}
