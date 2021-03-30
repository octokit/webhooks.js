import { IncomingMessage, ServerResponse } from "http";

export function onUnhandledRequestDefault(
  request: IncomingMessage,
  response: ServerResponse
) {
  response.writeHead(404, {
    "content-type": "application/json",
  });
  response.end(
    JSON.stringify({
      error: `Unknown route: ${request.method} ${request.url}`,
    })
  );
}
