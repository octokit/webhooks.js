// @ts-ignore to address #245
import AggregateError from "aggregate-error";

// remove type imports from http for Deno compatibility
// see https://github.com/octokit/octokit.js/issues/2075#issuecomment-817361886
// import type { IncomingMessage } from "node:http";
// declare module "node:http" {
//    interface IncomingMessage {
//      body?: string;
//    }
// }
type IncomingMessage = any;

export function getPayload(request: IncomingMessage): Promise<string> {
  // If request.body already exists we can stop here
  // See https://github.com/octokit/webhooks.js/pull/23

  if (request.body) return Promise.resolve(request.body);

  return new Promise((resolve, reject) => {
    let data: Buffer[] = [];

    request.on("error", (error: Error) => reject(new AggregateError([error])));
    request.on("data", (chunk: Buffer) => data.push(chunk));
    request.on("end", () =>
      // setImmediate improves the throughput by reducing the pressure from
      // the event loop
      setImmediate(
        resolve,
        data.length === 1
          ? data[0].toString("utf8")
          : Buffer.concat(data).toString("utf8"),
      ),
    );
  });
}
