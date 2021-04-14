// remove type imports from http for Deno compatibility
// see https://github.com/octokit/octokit.js/issues/24#issuecomment-817361886
// import { IncomingMessage, ServerResponse } from "http";
type IncomingMessage = any;
type ServerResponse = any;

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
