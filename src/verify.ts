import { verify as verifyMethod } from "@octokit/webhooks-methods";

import { toNormalizedJsonString } from "./to-normalized-json-string";

export async function verify(
  secret: string,
  additionalSecrets: undefined | string[],
  payload: string | object,
  signature: string
): Promise<any> {
  const normPayload =
    typeof payload === "string" ? payload : toNormalizedJsonString(payload);

  const firstPass = await verifyMethod(secret, normPayload, signature);

  if (firstPass) {
    return true;
  }

  if (additionalSecrets !== undefined) {
    for (const s of additionalSecrets) {
      const v: boolean = await verifyMethod(s, normPayload, signature);
      if (v) {
        return v;
      }
    }
  }

  return false;
}
