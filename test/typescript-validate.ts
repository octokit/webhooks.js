import Webhooks, {
  createEventHandler,
  createMiddleware,
  createWebhooksApi,
  sign,
  verify,
} from "..";
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
    transform: (event) => event,
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

  sign({});

  verify({}, "randomSignature");

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
        console.log(payload);
      }
      if ("comment" in payload) {
        console.log(payload.comment);
      }
    }
  );

  webhooks.on(["check_run.completed", "check_run.created"], () => {});
  webhooks.on("check_run.created", ({ name, payload }) => {
    console.log(payload.check_run.conclusion, name);
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

  createServer(webhooks.middleware).listen(3000);
}
