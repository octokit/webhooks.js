import { it, describe, assert } from "../testrunner.ts";
import { wrapErrorHandler } from "../../src/event-handler/wrap-error-handler.ts";

describe("wrapErrorHandler", () => {
  let logCalls: any[][] = [];

  console.log = function (...args: any[]) {
    logCalls.push(args);
  };

  it("error thrown in error handler", () => {
    wrapErrorHandler(() => {
      throw new Error("oopsydoopsy");
    }, new Error("oops"));

    assert(logCalls.length === 2);
    assert(/^FATAL/.test(logCalls[0][0]));
    assert(logCalls[1][0] instanceof Error);
    assert(logCalls[1][0].message === "oopsydoopsy");

    logCalls = [];
  });

  it("error handler returns rejected Error", async () => {
    const promise = Promise.reject(new Error("oopsydoopsy"));

    (wrapErrorHandler(() => promise, new Error("oops")),
      await promise.catch(() => {
        assert(logCalls.length === 2);
        assert(/^FATAL/.test(logCalls[0][0]));
        assert(logCalls[1][0] instanceof Error);
        assert(logCalls[1][0].message === "oopsydoopsy");
      }));

    logCalls = [];
  });
});
