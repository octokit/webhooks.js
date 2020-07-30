import { IncomingMessage } from "http";

export function getPayload(request: IncomingMessage): Promise<any> {
  // If request.body already exists we can stop here
  // See https://github.com/octokit/webhooks.js/pull/23

  // @ts-ignore
  if (request.body) return Promise.resolve(request.body);

  return new Promise((resolve, reject) => {
    let data = "";

    request.on("error", reject);
    request.on("data", (chunk) => (data += chunk));
    request.on("end", () => {
      try {
        resolve(JSON.parse(data));
      } catch (error) {
        error.message = "Invalid JSON";
        error.status = 400;
        reject(error);
      }
    });
  });
}
