import { timingSafeEqual } from "crypto";
import { Buffer } from "buffer";
import { EventTypesPayload } from "../generated/get-webhook-payload-type-from-event";
import { sign } from "../sign/index";

type WebhookEvents = Exclude<
  keyof EventTypesPayload,
  `${string}.${string}` | "errors" | "*"
>;

type GithubEvent<TName extends WebhookEvents = WebhookEvents> = Omit<
  EventTypesPayload[TName],
  "name"
> & { name: TName };

const getAlgorithm = (signature: string) => {
  return signature.startsWith("sha256=") ? "sha256" : "sha1";
};

export function verify(
  secret: string,
  eventPayload: object,
  signature: string
): eventPayload is GithubEvent {
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
