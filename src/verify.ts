import { verify as verifyMethod } from "@octokit/webhooks-methods";

import { toNormalizedJsonString } from "./to-normalized-json-string";

export async function verify(
  secret: string | string[],
  payload: string | object,
  signature: string
): Promise<any> {
  const secrets = typeof secret === "string" ? [secret] : secret;
  const np =
    typeof payload === "string" ? payload : toNormalizedJsonString(payload);

  for (const s of secrets) {
    const v : boolean = await verifyMethod(s, np, signature);
    if (v) {
      return v;
    }
  }

  return false;
}
