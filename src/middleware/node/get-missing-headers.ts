// remove type imports from http for Deno compatibility
// see https://github.com/octokit/octokit.js/issues/24#issuecomment-817361886
// import type { IncomingMessage } from "node:http";
type IncomingMessage = any;

const webhookHeadersMissingMessage = [
  // 0b000
  "",
  // 0b001
  JSON.stringify({
    error: `Required header missing: x-github-event`,
  }),
  // 0b010
  JSON.stringify({
    error: `Required header missing: x-github-signature-256`,
  }),
  // 0b011
  JSON.stringify({
    error: `Required headers missing: x-github-event, x-github-signature-256`,
  }),
  // 0b100
  JSON.stringify({
    error: `Required header missing: x-github-delivery`,
  }),
  // 0b101
  JSON.stringify({
    error: `Required headers missing: x-github-event, x-github-delivery`,
  }),
  // 0b110
  JSON.stringify({
    error: `Required headers missing: x-github-signature-256, x-github-delivery`,
  }),
  // 0b111
  JSON.stringify({
    error: `Required headers missing: x-github-event, x-github-signature-256, x-github-delivery`,
  }),
];

// https://docs.github.com/en/developers/webhooks-and-events/webhook-events-and-payloads#delivery-headers
export function getMissingHeaders(request: IncomingMessage) {
  return webhookHeadersMissingMessage[
    // @ts-ignore
    (("x-github-event" in request.headers === false) << 0) |
      // @ts-ignore
      (("x-hub-signature-256" in request.headers === false) << 1) |
      // @ts-ignore
      (("x-github-delivery" in request.headers === false) << 2)
  ];
}
