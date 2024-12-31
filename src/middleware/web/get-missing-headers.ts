const WEBHOOK_HEADERS = [
  "x-github-event",
  "x-hub-signature-256",
  "x-github-delivery",
];

// https://docs.github.com/en/developers/webhooks-and-events/webhook-events-and-payloads#delivery-headers
export function getMissingHeaders(request: Request) {
  return WEBHOOK_HEADERS.filter((header) => !request.headers.has(header));
}
