import { createHmac } from "crypto";

export enum Algorithm {
  SHA1 = "sha1",
  SHA256 = "sha256",
}

type SignOptions = {
  secret: string;
  algorithm?: string;
};

export function sign(
  options: SignOptions | string,
  payload: string | object
): string {
  const { secret, algorithm } =
    typeof options === "string"
      ? { secret: options, algorithm: Algorithm.SHA1 }
      : {
          secret: options.secret,
          algorithm: options.algorithm || Algorithm.SHA1,
        };

  if (!secret || !payload) {
    throw new TypeError("[@octokit/webhooks] secret & payload required");
  }

  if (!Object.values(Algorithm).includes(algorithm as Algorithm)) {
    throw new TypeError(
      `[@octokit/webhooks] Algorithm ${algorithm} is not supported. Must be  'sha1' or 'sha256'`
    );
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
