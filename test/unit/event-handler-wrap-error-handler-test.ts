import simple from "simple-mock";
import { wrapErrorHandler } from "../../src/event-handler/wrap-error-handler";

test("error thrown in error handler", () => {
  expect.assertions(2);

  const messages = [];
  simple.mock(console, "log", messages.push.bind(messages));
  expect(() => {
    wrapErrorHandler(() => {
      throw new Error("oopsydoopsy");
    }, new Error("oops"));
  }).not.toThrow();

  expect(messages.find((message) => /FATAL/.test(message))).toBeTruthy();
  simple.restore();
});

test("error handler returns rejected Error", () => {
  expect.assertions(2);

  const messages = [];
  simple.mock(console, "log", messages.push.bind(messages));
  const promise = Promise.reject(new Error("oopsydoopsy"));
  expect(() =>
    wrapErrorHandler(() => promise, new Error("oops"))
  ).not.toThrow();

  promise.catch(() => {
    expect(messages.find((message) => /FATAL/.test(message))).toBeTruthy();
    simple.restore();
  });
});
