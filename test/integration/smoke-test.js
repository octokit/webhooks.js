const test = require("tap").test;

test("@octokit/webhooks", (t) => {
  const { createWebhooksApi } = require("../../lib");
  const api = createWebhooksApi({ secret: "mysecret" });

  t.type(api.sign, "function");
  t.type(api.verify, "function");
  t.type(api.on, "function");
  t.type(api.removeListener, "function");
  t.type(api.receive, "function");
  t.type(api.middleware, "function");
  t.type(api.verifyAndReceive, "function");

  t.end();
});

test('require("@octokit/webhooks").sign', (t) => {
  t.doesNotThrow(() => {
    const { sign } = require("../../lib");
    sign('1234', {});
  });

  t.end();
});

test('require("@octokit/webhooks").verify', (t) => {
  t.doesNotThrow(() => {
    const { verify } = require("../../lib");
    verify('1234', {}, 'randomSignature')
  });

  t.end();
});

test('require("@octokit/webhooks").createEventHandler', (t) => {
  t.doesNotThrow(() => {
    const { createEventHandler } = require("../../lib");
    createEventHandler();
  });

  t.end();
});

test('require("@octokit/webhooks).createMiddleware")', (t) => {
  t.doesNotThrow(() => {
    const { createMiddleware } = require("../../lib");
    createMiddleware({ secret: '1234' })
  });

  t.end();
});
