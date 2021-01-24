import {
  Webhooks,
  sign,
  verify,
  createEventHandler,
  createMiddleware,
} from "../../src";

test("@octokit/webhooks", () => {
  const emitWarningSpy = jest.spyOn(process, "emitWarning");
  const api = new Webhooks({
    secret: "mysecret",
  });

  expect(typeof api.sign).toBe("function");
  expect(typeof api.verify).toBe("function");
  expect(typeof api.on).toBe("function");
  expect(typeof api.removeListener).toBe("function");
  expect(typeof api.receive).toBe("function");
  expect(typeof api.middleware).toBe("function");
  expect(typeof api.verifyAndReceive).toBe("function");
  expect(emitWarningSpy).not.toHaveBeenCalled();
});

test('require("@octokit/webhooks").sign', () => {
  const emitWarningSpy = jest.spyOn(process, "emitWarning");

  expect(() => {
    sign("1234", {});
  }).not.toThrow();
  expect(emitWarningSpy).not.toHaveBeenCalled();
});

test('require("@octokit/webhooks").verify', () => {
  const emitWarningSpy = jest.spyOn(process, "emitWarning");

  expect(() => {
    verify("1234", {}, "randomSignature");
  }).not.toThrow();
  expect(emitWarningSpy).not.toHaveBeenCalled();
});

test('require("@octokit/webhooks").createEventHandler', () => {
  const emitWarningSpy = jest.spyOn(process, "emitWarning");

  expect(() => {
    createEventHandler({});
  }).not.toThrow();
  expect(emitWarningSpy).not.toHaveBeenCalled();
});

test('require("@octokit/webhooks").createMiddleware', () => {
  const emitWarningSpy = jest.spyOn(process, "emitWarning");

  expect(() => {
    createMiddleware({ secret: "1234" });
  }).not.toThrow();
  expect(emitWarningSpy).not.toHaveBeenCalled();
});
