import type { WebhookEvent } from "@octokit/webhooks-types";
// @ts-ignore to address #245
import AggregateError from "aggregate-error";

// remove type imports from http for Deno compatibility
// see https://github.com/octokit/octokit.js/issues/24#issuecomment-817361886
// import { IncomingMessage } from "http";
// declare module "http" {
//   interface IncomingMessage {
//     body?: WebhookEvent | unknown;
//   }
// }
type IncomingMessage = any;

export function getPayload(
  request: IncomingMessage
): Promise<WebhookEvent | string> {
  // If request.body already exists we can stop here
  // See https://github.com/octokit/webhooks.js/pull/23

  if (request.body) {
    if (typeof request.body !== "string") {
      console.warn(
        "[@octokit/webhooks] Passing the payload as a JSON object in `request.body` is deprecated and will be removed in a future release of `@octokit/webhooks`, please pass it as a a `string` instead."
      );
    }
    return Promise.resolve(request.body as WebhookEvent | string);
  }

  return new Promise((resolve, reject) => {
    let data = "";

    request.setEncoding("utf8");

    // istanbul ignore next
    request.on("error", (error: Error) => reject(new AggregateError([error])));
    request.on("data", (chunk: string) => (data += chunk));
    request.on("end", () => {
      try {
        // Call JSON.parse() only to check if the payload is valid JSON
        JSON.parse(data);
        resolve(data);
      } catch (error: any) {
        error.message = "Invalid JSON";
        error.status = 400;
        reject(new AggregateError([error]));
      }
    });
  });
}
