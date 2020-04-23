const test = require("tap").test;

test("@octokit/webhooks", (t) => {
  const createWebhooksApi = require("../../src");
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

test('require("@octokit/webhooks/sign")', (t) => {
  t.doesNotThrow(() => {
	const sign = require("../../src/sign");
	sign('1234', {})
  });

  t.end();
});

test('require("@octokit/webhooks/verify")', (t) => {
  t.doesNotThrow(() => {
	const verify = require("../../src/verify");
	verify('1234', {}, 'randomSignature')
  });

  t.end();
});

test('require("@octokit/webhooks/event-handler")', (t) => {
  t.doesNotThrow(() => {
	const createEventHandler = require("../../src/event-handler");
	createEventHandler()
  });

  t.end();
});

test('require("@octokit/webhooks/middleware")', (t) => {
  t.doesNotThrow(() => {
	const createMiddleware = require("../../src/middleware");
	createMiddleware({ secret: '1234' })
  });

  t.end();
});
