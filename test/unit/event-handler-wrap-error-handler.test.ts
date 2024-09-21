import { test, expect, vi } from "vitest";
import { wrapErrorHandler } from "../../src/event-handler/wrap-error-handler.ts";

const noop = () => {};

test("error thrown in error handler", () => {
  expect.assertions(2);

  const consoleLogSpy = vi.spyOn(console, "log").mockImplementation(noop);
  expect(() => {
    wrapErrorHandler(() => {
      throw new Error("oopsydoopsy");
    }, new Error("oops"));
  }).not.toThrow();

  expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringMatching(/FATAL/));
});

test("error handler returns rejected Error", () => {
  expect.assertions(2);

  const consoleLogSpy = vi.spyOn(console, "log").mockImplementation(noop);
  const promise = Promise.reject(new Error("oopsydoopsy"));
  expect(() =>
    wrapErrorHandler(() => promise, new Error("oops")),
  ).not.toThrow();

  promise.catch(() => {
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringMatching(/FATAL/));
  });
});
