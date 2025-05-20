import { describe, it, assert } from "../testrunner.ts";
import { createLogger } from "../../src/create-logger.ts";

const noop = () => {};

describe("createLogger", () => {
  console.debug = noop;
  console.info = noop;
  console.warn = noop;
  console.error = noop;

  it("when nothing is passed provides default implementations for all log levels", () => {
    const logger = createLogger();

    logger.debug("hello world");
    logger.info("hello world");
    logger.warn("hello world");
    logger.error("hello world");
  });

  let debugCalls: any[][] = [];
  let errorCalls: any[][] = [];

  const partialLogger = {
    debug: (...args: any[]) => {
      debugCalls.push(args);
    },
    error: (...args: any[]) => {
      errorCalls.push(args);
    },
  };

  it("when some log levels are provided uses the provided implementations for the given log levels", () => {
    const logger = createLogger(partialLogger);

    logger.debug("hello world");
    logger.error("hello world");

    assert(debugCalls.length === 1);
    assert(debugCalls[0].length === 1);
    assert(debugCalls[0][0] === "hello world");

    assert(errorCalls.length === 1);
    assert(errorCalls[0].length === 1);
    assert(errorCalls[0][0] === "hello world");
  });

  it("when some log levels are provided provides default implementations for the remaining log levels", () => {
    const logger = createLogger(partialLogger);

    logger.info("hello world");
    logger.warn("hello world");
  });
});
