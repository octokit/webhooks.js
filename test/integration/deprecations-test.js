const test = require("tap").test;
const { mock } = require("simple-mock");

test("@octokit/webhooks", (t) => {
  const emitWarningMock = mock(process, "emitWarning");
  const createWebhooksApi = require("../../src");
  const api = createWebhooksApi({ secret: "mysecret" });

  t.true(emitWarningMock.called);
  t.equals(emitWarningMock.callCount, 1);
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
  const emitWarningMock = mock(process, "emitWarning");
  t.doesNotThrow(() => {
    const sign = require("../../src/sign");
    sign("1234", {});
  });

  t.true(emitWarningMock.called);
  t.equals(emitWarningMock.callCount, 1);

  t.end();
});

test('require("@octokit/webhooks/verify")', (t) => {
  const emitWarningMock = mock(process, "emitWarning");
  t.doesNotThrow(() => {
    const verify = require("../../src/verify");
    verify("1234", {}, "randomSignature");
  });

  t.true(emitWarningMock.called);
  t.equals(emitWarningMock.callCount, 1);

  t.end();
});

test('require("@octokit/webhooks/event-handler")', (t) => {
  const emitWarningMock = mock(process, "emitWarning");
  t.doesNotThrow(() => {
    const createEventHandler = require("../../src/event-handler");
    createEventHandler();
  });

  t.true(emitWarningMock.called);
  t.equals(emitWarningMock.callCount, 1);

  t.end();
});

test('require("@octokit/webhooks/middleware")', (t) => {
  const emitWarningMock = mock(process, "emitWarning");
  t.doesNotThrow(() => {
    const createMiddleware = require("../../src/middleware");
    createMiddleware({ secret: "1234" });
  });

  t.true(emitWarningMock.called);
  t.equals(emitWarningMock.callCount, 1);

  t.end();
});
