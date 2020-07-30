import {
  Webhooks,
  createEventHandler,
  createMiddleware,
  createWebhooksApi,
  sign,
  verify,
  EventNames,
  EventPayloads,
} from "../src/index";
import { WebhookEvent } from "../src/types";
import { createServer } from "http";

// ************************************************************
// THIS CODE IS NOT EXECUTED. IT IS JUST FOR TYPECHECKING
// ************************************************************

export default async function () {
  // Check empty constructor
  new Webhooks();

  // Check that all options are optional except for secret
  new Webhooks({
    secret: "bleh",
  });

  // Check all supported options
  const webhooks = new Webhooks({
    secret: "bleh",
    path: "/webhooks",
    transform: (event: WebhookEvent) => event,
  });

  // Check named expors of new API work
  createWebhooksApi({
    secret: "bleh",
  });

  createEventHandler({ secret: "bleh" });

  createMiddleware({
    secret: "mysecret",
    path: "/github-webhooks",
  });

  sign("randomSecret", {});

  verify("randomSecret", {}, "randomSignature");

  webhooks.on("*", ({ id, name, payload }: WebhookEvent) => {
    console.log(name, "event received");
    const sig = webhooks.sign("secret", payload);
    webhooks.verify(payload, sig);
  });

  webhooks.on("check_run.completed", () => {});

  webhooks.on(
    ([
      "check_run.completed",
      "commit_comment",
      "label",
    ] as unknown) as EventNames.AllEventTypes,
    ({
      name,
      payload,
    }:
      | EventPayloads.WebhookEvent<EventPayloads.WebhookPayloadCheckRun>
      | EventPayloads.WebhookEvent<EventPayloads.WebhookPayloadCommitComment>
      | EventPayloads.WebhookEvent<EventPayloads.WebhookPayloadLabel>) => {
      console.log(name);
      if ("check_run" in payload) {
        console.log(payload);
      }
      if ("comment" in payload) {
        console.log(payload.comment);
      }
    }
  );

  webhooks.on(
    ([
      "check_run.completed",
      "check_run.created",
    ] as unknown) as EventNames.AllEventTypes,
    () => {}
  );
  webhooks.on(
    "check_run.created",
    ({
      name,
      payload,
    }: EventPayloads.WebhookEvent<EventPayloads.WebhookPayloadCheckRun>) => {
      console.log(payload.check_run.conclusion, name);
    }
  );

  webhooks.removeListener(
    "check_run.created",
    ({
      name,
      payload,
    }: EventPayloads.WebhookEvent<EventPayloads.WebhookPayloadCheckRun>) => {
      console.log(payload.check_run.conclusion, name);
    }
  );
  webhooks.removeListener(
    ["commit_comment", "label"],
    ({
      name,
      payload,
    }:
      | EventPayloads.WebhookEvent<EventPayloads.WebhookPayloadCommitComment>
      | EventPayloads.WebhookEvent<EventPayloads.WebhookPayloadLabel>) => {
      console.log(name);
      if ("label" in payload) {
        console.log(payload.label.name);
      } else {
        console.log(payload.comment.body);
      }
    }
  );

  webhooks.on("issues", (event) => {
    console.log(event.payload.issue);
  });

  createServer(webhooks.middleware).listen(3000);
}
