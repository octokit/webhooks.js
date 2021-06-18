import { verify as verifyMethod } from "@octokit/webhooks-methods";

import { toNormalizedJsonString } from "./to-normalized-json-string";

export async function verify(
  secret: string,
  payload: string | object,
  signature: string
): Promise<any> {
  return verifyMethod(
    secret,
    typeof payload === "string" ? payload : toNormalizedJsonString(payload),
    signature
  );
}
