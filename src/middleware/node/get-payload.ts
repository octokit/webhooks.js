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

export function getPayload(request: IncomingMessage): Promise<Buffer> {
  // If request.body already exists we can stop here
  // See https://github.com/octokit/webhooks.js/pull/23
  return new Promise((resolve, reject) => {
    let data: Buffer[] = [];

    // istanbul ignore next
    request.on("error", (error: Error) => reject(new AggregateError([error])));
    request.on("data", (chunk: Buffer) => data.push(chunk));
    request.on("end", () => resolve(Buffer.concat(data)));
  });
}
