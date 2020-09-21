import AggregateError from "aggregate-error";

import { IncomingMessage } from "http";
import { EventTypesPayload } from "../generated/get-webhook-payload-type-from-event";

type AllPayloadTypes = EventTypesPayload[keyof Omit<EventTypesPayload, "*">];

export function getPayload(request: IncomingMessage): Promise<AllPayloadTypes> {
  // If request.body already exists we can stop here
  // See https://github.com/octokit/webhooks.js/pull/23

  // @ts-ignore
  if (request.body) return Promise.resolve(request.body);

  return new Promise((resolve, reject) => {
    let data = "";

    request.setEncoding("utf8");
    request.on("error", (error) => reject(new AggregateError([error])));
    request.on("data", (chunk) => (data += chunk));
    request.on("end", () => {
      try {
        resolve(JSON.parse(data));
      } catch (error) {
        error.message = "Invalid JSON";
        error.status = 400;
        reject(new AggregateError([error]));
      }
    });
  });
}
