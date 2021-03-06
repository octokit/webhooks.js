import { sign as signMethod } from "@octokit/webhooks-methods";

import { toNormalizedJsonString } from "./to-normalized-json-string";

export async function sign(
  secret: string,
  payload: string | object
): Promise<any> {
  return signMethod(
    secret,
    typeof payload === "string" ? payload : toNormalizedJsonString(payload)
  );
}
