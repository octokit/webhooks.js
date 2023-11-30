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
  if ("body" in request) {
    if (
      typeof request.body === "object" &&
      "rawBody" in request &&
      request.rawBody instanceof Buffer
    ) {
      // The body is already an Object and rawBody is a Buffer (e.g. GCF)
      return Promise.resolve(request.rawBody.toString("utf8"));
    } else {
      // The body is a String (e.g. Lambda)
      return Promise.resolve(request.body);
    }
  }

  // We need to load the payload from the request (normal case of Node.js server)
  return new Promise((resolve, reject) => {
    let data = "";

    request.setEncoding("utf8");

    // istanbul ignore next
    request.on("error", (error: Error) => reject(new AggregateError([error])));
    request.on("data", (chunk: string) => (data += chunk));
    request.on("end", () => resolve(data));
  });
}
