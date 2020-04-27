const test = require("tap").test;
const { mock } = require("simple-mock");

test("@octokit/webhooks", (t) => {
  const emitWarningMock = mock(process, "emitWarning");
  const { createWebhooksApi } = require("../../lib");
  const api = createWebhooksApi({ secret: "mysecret" });

  t.type(api.sign, "function");
  t.type(api.verify, "function");
  t.type(api.on, "function");
  t.type(api.removeListener, "function");
  t.type(api.receive, "function");
  t.type(api.middleware, "function");
  t.type(api.verifyAndReceive, "function");
  t.false(emitWarningMock.called);

  t.end();
});

test('require("@octokit/webhooks").sign', (t) => {
  const emitWarningMock = mock(process, "emitWarning");

  t.doesNotThrow(() => {
    const { sign } = require("../../lib");
    sign("1234", {});
  });
  t.false(emitWarningMock.called);

  t.end();
});

test('require("@octokit/webhooks").verify', (t) => {
  const emitWarningMock = mock(process, "emitWarning");

  t.doesNotThrow(() => {
    const { verify } = require("../../lib");
    verify("1234", {}, "randomSignature");
  });
  t.false(emitWarningMock.called);

  t.end();
});

test('require("@octokit/webhooks").createEventHandler', (t) => {
  const emitWarningMock = mock(process, "emitWarning");

  t.doesNotThrow(() => {
    const { createEventHandler } = require("../../lib");
    createEventHandler();
  });
  t.false(emitWarningMock.called);

  t.end();
});

test('require("@octokit/webhooks).createMiddleware")', (t) => {
  const emitWarningMock = mock(process, "emitWarning");

  t.doesNotThrow(() => {
    const { createMiddleware } = require("../../lib");
    createMiddleware({ secret: "1234" });
  });
  t.false(emitWarningMock.called);

  t.end();
});
