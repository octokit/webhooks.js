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

  return secrets.some((s: string) => verifyMethod(s, np, signature));
}
