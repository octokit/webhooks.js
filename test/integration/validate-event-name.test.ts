import { describe, it, assert } from "../testrunner.ts";
import { validateEventName } from "../../src/event-handler/validate-event-name.ts";

describe("validateEventName", () => {
  it("validates 'push'", () => {
    validateEventName("push");
  });

  [null, undefined, {}, [], true, false, 1].forEach((value) => {
    it(`throws on invalid event name data type - ${JSON.stringify(value)}`, () => {
      try {
        validateEventName(value as any);
        throw new Error("Should have thrown");
      } catch (error) {
        assert(error instanceof TypeError === true);
        assert((error as Error).message === "eventName must be of type string");
      }
    });
  });

  it('throws on invalid event name - "error"', () => {
    try {
      validateEventName("error");
      throw new Error("Should have thrown");
    } catch (error) {
      assert(error instanceof TypeError === true);
      assert(
        (error as Error).message ===
          'Using the "error" event with the regular Webhooks.on() function is not supported. Please use the Webhooks.onError() method instead',
      );
    }
  });

  it('throws on invalid event name - "error" with onUnkownEventName set to "warn"', () => {
    try {
      validateEventName("error", { onUnknownEventName: "warn" });
      throw new Error("Should have thrown");
    } catch (error) {
      assert(error instanceof TypeError === true);
      assert(
        (error as Error).message ===
          'Using the "error" event with the regular Webhooks.on() function is not supported. Please use the Webhooks.onError() method instead',
      );
    }
  });

  it('throws on invalid event name - "error" with onUnkownEventName set to "ignore"', () => {
    try {
      validateEventName("error", { onUnknownEventName: "ignore" });
      throw new Error("Should have thrown");
    } catch (error) {
      assert(error instanceof TypeError === true);
      assert(
        (error as Error).message ===
          'Using the "error" event with the regular Webhooks.on() function is not supported. Please use the Webhooks.onError() method instead',
      );
    }
  });

  it('throws on invalid event name - "*"', () => {
    try {
      validateEventName("*");
      throw new Error("Should have thrown");
    } catch (error) {
      assert(error instanceof TypeError === true);
      assert(
        (error as Error).message ===
          'Using the "*" event with the regular Webhooks.on() function is not supported. Please use the Webhooks.onAny() method instead',
      );
    }
  });

  it('throws on invalid event name - "*" with onUnkownEventName set to "warn"', () => {
    try {
      validateEventName("*", { onUnknownEventName: "warn" });
      throw new Error("Should have thrown");
    } catch (error) {
      assert(error instanceof TypeError === true);
      assert(
        (error as Error).message ===
          'Using the "*" event with the regular Webhooks.on() function is not supported. Please use the Webhooks.onAny() method instead',
      );
    }
  });

  it('throws on invalid event name - "*" with onUnkownEventName set to "ignore"', () => {
    try {
      validateEventName("*", { onUnknownEventName: "ignore" });
      throw new Error("Should have thrown");
    } catch (error) {
      assert(error instanceof TypeError === true);
      assert(
        (error as Error).message ===
          'Using the "*" event with the regular Webhooks.on() function is not supported. Please use the Webhooks.onAny() method instead',
      );
    }
  });

  it('throws on invalid event name - "invalid"', () => {
    try {
      validateEventName("invalid");
      throw new Error("Should have thrown");
    } catch (error) {
      assert(error instanceof TypeError === true);
      assert(
        (error as Error).message ===
          '"invalid" is not a known webhook name (https://developer.github.com/v3/activity/events/types/)',
      );
    }
  });

  it('logs on invalid event name - "invalid" and onUnknownEventName is "warn" - console.warn', () => {
    const consoleWarn = console.warn;
    const logWarnCalls: string[] = [];
    console.warn = Array.prototype.push.bind(logWarnCalls);

    validateEventName("invalid", { onUnknownEventName: "warn" });
    try {
      assert(logWarnCalls.length === 1);
      assert(
        logWarnCalls[0] ===
          '"invalid" is not a known webhook name (https://developer.github.com/v3/activity/events/types/)',
      );
    } catch (error) {
      throw error;
    } finally {
      console.warn = consoleWarn; // restore original console.warn
    }
  });

  it('logs on invalid event name - "invalid" and onUnknownEventName is "warn" - custom logger', () => {
    const logWarnCalls: string[] = [];
    const log = {
      warn: (message: string) => {
        logWarnCalls.push(message);
      },
    };
    validateEventName("invalid", { onUnknownEventName: "warn", log });
    assert(logWarnCalls.length === 1);
    assert(
      logWarnCalls[0] ===
        '"invalid" is not a known webhook name (https://developer.github.com/v3/activity/events/types/)',
    );
  });

  it('logs nothing on invalid event name - "invalid" and onUnknownEventName is "ignore" - custom logger', () => {
    const logWarnCalls: string[] = [];
    const log = {
      warn: (message: string) => {
        logWarnCalls.push(message);
      },
    };
    validateEventName("invalid", { onUnknownEventName: "ignore", log });
    assert(logWarnCalls.length === 0);
  });
});
