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

export function getPayload(request: IncomingMessage): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    let data: Buffer[] = [];

    // istanbul ignore next
    request.on("error", (error: Error) => reject(new AggregateError([error])));
    request.on("data", (chunk: Buffer) => data.push(chunk));
    // istanbul ignore next
    request.on("end", () =>
      // setImmediate improves the throughput by reducing the pressure from
      // the event loop
      setImmediate(resolve, data.length === 1 ? data[0] : Buffer.concat(data)),
    );
  });
}
