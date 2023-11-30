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

export function getPayload(request: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let data = "";

    request.setEncoding("utf8");

    // istanbul ignore next
    request.on("error", (error: Error) => reject(new AggregateError([error])));
    request.on("data", (chunk: string) => (data += chunk));
    request.on("end", () => resolve(data));
  });
}
