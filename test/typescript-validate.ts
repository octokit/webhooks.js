import {
  Webhooks,
  createEventHandler,
  createMiddleware,
  createWebhooksApi,
  sign,
  verify,
  EventNames,
  EventPayloads,
  WebhookEvent,
  WebhookError,
} from "../src/index";
import { createServer } from "http";

// ************************************************************
// THIS CODE IS NOT EXECUTED. IT IS FOR TYPECHECKING ONLY
// ************************************************************

const myWebhook: WebhookEvent<{ foo: string }> = {
  id: "123",
  name: "check_run",
  payload: {
    foo: "bar",
  },
};

const myEventName: EventNames.All = "check_run.completed";

const myEvenTPayload: EventPayloads.WebhookPayloadCheckRunCheckRunOutput = {
  annotations_count: 0,
  annotations_url: "",
  summary: "",
  text: "",
  title: "",
};

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
    transform: (event) => {
      console.log(event.payload);
      return Object.assign(event, { foo: "bar" });
    },
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

  webhooks.on("*", ({ id, name, payload }) => {
    console.log(name, "event received");
    const sig = webhooks.sign(payload);
    webhooks.verify(payload, sig);
  });

  webhooks.on("check_run.completed", () => {});

  webhooks.on(
    ["check_run.completed", "commit_comment", "label"],
    ({ name, payload }) => {
      console.log(name);
      if ("check_run" in payload) {
        console.log(payload.check_run.output.title);
      }
      if ("comment" in payload) {
        console.log(payload.comment.user.login);
      }
    }
  );

  webhooks.on(["check_run.completed", "check_run.created"], () => {});
  webhooks.on("check_run.created", ({ name, payload }) => {
    console.log(payload.check_run.conclusion, name);
  });

  webhooks.on("check_run.created", () => {
    return 2;
  });

  webhooks.on("check_run.created", () => {
    return Promise.resolve(10);
  });

  webhooks.removeListener("check_run.created", ({ name, payload }) => {
    console.log(payload.check_run.conclusion, name);
  });
  webhooks.removeListener(["commit_comment", "label"], ({ name, payload }) => {
    console.log(name);
    if ("label" in payload) {
      console.log(payload.label.name);
    } else {
      console.log(payload.comment.body);
    }
  });

  webhooks.on("issues", (event) => {
    console.log(event.payload.issue);
  });

  webhooks.on("issues", (event) => {
    // foo is set by options.transform
    console.log(event.foo);
  });

  webhooks.on("error", (error) => {
    console.log(error.event.name);
    const [firstError] = Array.from(error);
    console.log(firstError.status);
    console.log(firstError.headers);
    console.log(firstError.request);
  });

  createServer(webhooks.middleware).listen(3000);
}

export function webhookErrorTest(error: WebhookError) {
  const { request } = error;
  console.log(request);
}

// ************************************************************
// DEPRECATIONS RETRO-COMPATIBILITY
// ************************************************************

export function webhookErrorTestDeprecated(error: WebhookError) {
  const { event, request } = error;
  console.log(event);
  console.log(request);
}
