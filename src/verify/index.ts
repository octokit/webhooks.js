import { timingSafeEqual } from "crypto";
import { Buffer } from "buffer";
import { sign } from "../sign/index";

const getAlgorithm = (signature: string) => {
  return signature.startsWith("sha256=") ? "sha256" : "sha1";
};

export function verify(
  secret: string,
  eventPayload: string | object,
  signature: string
): boolean {
  if (!secret || !eventPayload || !signature) {
    throw new TypeError(
      "[@octokit/webhooks] secret, eventPayload & signature required"
    );
  }

  const signatureBuffer = Buffer.from(signature);
  const algorithm = getAlgorithm(signature);

  const verificationBuffer = Buffer.from(
    sign({ secret, algorithm }, eventPayload)
  );

  if (signatureBuffer.length !== verificationBuffer.length) {
    return false;
  }

  return timingSafeEqual(signatureBuffer, verificationBuffer);
}
