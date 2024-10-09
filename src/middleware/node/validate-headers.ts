// remove type imports from http for Deno compatibility
// see https://github.com/octokit/octokit.js/issues/24#issuecomment-817361886
// import type { IncomingMessage } from "node:http";
type IncomingMessage = any;
type OutgoingMessage = any;

const webhookHeadersMissingMessage = {
  "x-github-event": JSON.stringify({
    error: `Required header missing: x-github-event`,
  }),
  "x-hub-signature-256": JSON.stringify({
    error: `Required header missing: x-github-signature-256`,
  }),
  "x-github-delivery": JSON.stringify({
    error: `Required header missing: x-github-delivery`,
  }),
};

function sendMissindHeaderResponse(
  response: OutgoingMessage,
  missingHeader: keyof typeof webhookHeadersMissingMessage,
) {
  response.writeHead(400, {
    "content-type": "application/json",
  });
  response.end(webhookHeadersMissingMessage[missingHeader]);
}

// https://docs.github.com/en/developers/webhooks-and-events/webhook-events-and-payloads#delivery-headers
export function validateHeaders(
  request: IncomingMessage,
  response: OutgoingMessage,
) {
  if ("x-github-event" in request.headers === false) {
    sendMissindHeaderResponse(response, "x-github-event");
  } else if ("x-hub-signature-256" in request.headers === false) {
    sendMissindHeaderResponse(response, "x-hub-signature-256");
  } else if ("x-github-delivery" in request.headers === false) {
    sendMissindHeaderResponse(response, "x-github-delivery");
  } else {
    return false;
  }

  return true;
}
