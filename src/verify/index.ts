import { timingSafeEqual } from "crypto";
import { Buffer } from "buffer";
import { sign } from "../sign/index";
import { AllPayloadTypes } from "../generated/get-webhook-payload-type-from-event";

export function verify(
  secret?: string,
  eventPayload?: AllPayloadTypes,
  signature?: string
): boolean {
  if (!secret || !eventPayload || !signature) {
    throw new TypeError("secret, eventPayload & signature required");
  }

  const signatureBuffer = Buffer.from(signature);
  const verificationBuffer = Buffer.from(sign(secret, eventPayload));

  if (signatureBuffer.length !== verificationBuffer.length) {
    return false;
  }

  return timingSafeEqual(signatureBuffer, verificationBuffer);
}
