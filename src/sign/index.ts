import { createHmac } from "crypto";

export function sign(secret: string, payload: string | object): string {
  if (!secret || !payload) {
    throw new TypeError("secret & payload required");
  }

  payload =
    typeof payload === "string" ? payload : toNormalizedJsonString(payload);
  return "sha1=" + createHmac("sha1", secret).update(payload).digest("hex");
}

function toNormalizedJsonString(payload: object) {
  return JSON.stringify(payload).replace(/[^\\]\\u[\da-f]{4}/g, (s) => {
    return s.substr(0, 3) + s.substr(3).toUpperCase();
  });
}
