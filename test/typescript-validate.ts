import {
  Webhooks,
  createEventHandler,
  createMiddleware,
  createWebhooksApi,
  sign,
  verify,
  EventPayloads,
  EmitterWebhookEvent,
  WebhookError,
  WebhookEvents,
} from "../src/index";
import { createServer } from "http";
import { HandlerFunction, EmitterWebhookEventName } from "../src/types";

// ************************************************************
// THIS CODE IS NOT EXECUTED. IT IS FOR TYPECHECKING ONLY
// ************************************************************

const fn = (webhookEvent: EmitterWebhookEvent) => {
  // @ts-expect-error TS2367:
  //  This condition will always return 'false' since the types '"check_run" | ... many more ... | "workflow_run"' and '"check_run.completed"' have no overlap.
  if (webhookEvent.name === "check_run.completed") {
    //
  }
};

declare const on: <E extends EmitterWebhookEventName>(
  name: E | E[],
  callback: HandlerFunction<E, unknown>
) => void;

on(["check_run.completed", "code_scanning_alert.fixed"], (event) => {
  if (event.payload.action === "fixed") {
    console.log("an alert was fixed!");
  }

  if (event.payload.action === "completed") {
    console.log("a run was completed!");
  }
});

on("code_scanning_alert.fixed", (event) => {
  if (event.payload.action === "fixed") {
    console.log("an alert was fixed!");
  }

  // @ts-expect-error TS2367:
  //  This condition will always return 'false' since the types '"fixed"' and '"completed"' have no overlap.
  if (event.payload.action === "completed") {
    console.log("a run was completed!");
  }

  fn(event);
});

const myEventName: WebhookEvents = "check_run.completed";

const myEventPayload: EventPayloads.WebhookPayloadCheckRunCheckRunOutput = {
  annotations_count: 0,
  annotations_url: "",
  summary: "",
  text: "",
  title: "",
};

console.log(myEventName, myEventPayload);

export default async function () {
  // Check empty constructor
  new Webhooks();

  // Check that all options are optional except for secret
  new Webhooks({
    secret: "bleh",
  });

  // Check all supported options
  const webhooks = new Webhooks<EmitterWebhookEvent, { foo: string }>({
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
  sign({ secret: "randomSecret" }, {});
  sign({ secret: "randomSecret", algorithm: "sha1" }, {});
  sign({ secret: "randomSecret", algorithm: "sha256" }, {});

  verify("randomSecret", {}, "randomSignature");

  webhooks.onAny(({ id, name, payload }) => {
    console.log(name, "event received", id);
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

  webhooks.on(["check_run.completed", "code_scanning_alert.fixed"], (event) => {
    if (event.name === "check_run") {
      console.log(`a run was ${event.payload.action}!`);

      if (event.payload.action === "completed") {
        console.log("it was the completed action, obviously!");
      }

      // @ts-expect-error TS2367:
      //  This condition will always return 'false' since the types '"completed"' and '"created"' have no overlap.
      if (event.payload.action === "created") {
        //
      }
    }

    // @ts-expect-error TS2367:
    //  This condition will always return 'false' since the types '"check_run" | "code_scanning_alert"' and '"repository"' have no overlap.
    if (event.name === "repository") {
      //
    }
  });

  webhooks.on("issues", (event) => {
    console.log(event.payload.issue);
  });

  webhooks.on("issues", (event) => {
    // foo is set by options.transform
    console.log(event.foo);
  });

  // @ts-expect-error TS2345:
  //  Argument of type '"does_not_exist"' is not assignable to parameter of type ...
  webhooks.on("does_not_exist", (what) => {
    // this works because we pass a transform that adds foo to all events
    console.log(what.foo);
  });

  webhooks.onError((error) => {
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
  const { request } = error;
  console.log(request);
}
