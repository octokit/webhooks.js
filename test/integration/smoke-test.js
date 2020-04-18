import { test } from "tap";

test("@octokit/webhooks", (t) => {
  const { createWebhooksApi } = require("../../pkg/dist-src");

  const api = createWebhooksApi({
    secret: "mysecret",
  });

  t.type(api.sign, "function");
  t.type(api.verify, "function");
  t.type(api.on, "function");
  t.type(api.removeListener, "function");
  t.type(api.receive, "function");
  t.type(api.middleware, "function");
  t.type(api.verifyAndReceive, "function");

  t.end();
});

test('require("@octokit/webhooks/sign")', (t) => {
  t.doesNotThrow(() => {
    require("../../pkg/dist-src/sign");
  });

  t.end();
});

test('require("@octokit/webhooks/verify")', (t) => {
  t.doesNotThrow(() => {
    require("../../pkg/dist-src/verify");
  });

  t.end();
});

test('require("@octokit/webhooks/event-handler")', (t) => {
  t.doesNotThrow(() => {
    require("../../pkg/dist-src/event-handler");
  });

  t.end();
});

test('require("@octokit/webhooks/middleware")', (t) => {
  t.doesNotThrow(() => {
    require("../../pkg/dist-src/middleware");
  });

  t.end();
});
