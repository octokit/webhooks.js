import { createHmac } from "crypto";

export enum Algorithm {
  SHA1 = "sha1",
  SHA256 = "sha256",
}

type SignOptions = {
  secret: string;
  algorithm?: Algorithm;
};

export function sign(
  options: SignOptions | string,
  payload: string | object
): string {
  let secret;
  let algorithm;

  if (typeof options === "string") {
    secret = options;
    algorithm = Algorithm.SHA1;
  } else {
    secret = options.secret;
    algorithm = options.algorithm ?? Algorithm.SHA1;
  }
  // @ts-ignore throw friendly error message when required options are missing
  if (!secret || !payload) {
    throw new TypeError("secret & payload required");
  }

  payload =
    typeof payload === "string" ? payload : toNormalizedJsonString(payload);
  return `${algorithm}=${createHmac(algorithm, secret)
    .update(payload)
    .digest("hex")}`;
}

function toNormalizedJsonString(payload: object) {
  return JSON.stringify(payload).replace(/[^\\]\\u[\da-f]{4}/g, (s) => {
    return s.substr(0, 3) + s.substr(3).toUpperCase();
  });
}
