import { it, assert } from "../testrunner.ts";
import { receiverOn } from "../../src/event-handler/on.ts";
import type { State } from "../../src/types.ts";

function noop() {}

const state: State = {
  hooks: {},
  log: console,
};

it("receiver.on with invalid event name", () => {
  const consoleWarn = console.warn;
  let warnCalls: any[][] = [];

  console.warn = function (...args: any[]) {
    warnCalls.push(args);
  };

  // @ts-expect-error
  receiverOn(state, "foo", noop);

  assert(warnCalls.length === 1);
  assert(
    warnCalls[0][0] ===
      '"foo" is not a known webhook name (https://developer.github.com/v3/activity/events/types/)',
  );

  // Restore the original console.warn function
  console.warn = consoleWarn;
});

it("receiver.on with event name of '*' throws an error", () => {
  try {
    // @ts-expect-error
    receiverOn(state, "*", noop);
    assert(false);
  } catch (error) {
    assert(error instanceof Error);
    if (error instanceof Error) {
      assert(
        error.message ===
          'Using the "*" event with the regular Webhooks.on() function is not supported. Please use the Webhooks.onAny() method instead',
      );
    }
  }
});

it("receiver.on with event name of 'error' throws an error", () => {
  try {
    // @ts-expect-error
    receiverOn(state, "error", noop);
    assert(false);
  } catch (error) {
    assert(error instanceof Error);
    if (error instanceof Error) {
      assert(
        error.message ===
          'Using the "error" event with the regular Webhooks.on() function is not supported. Please use the Webhooks.onError() method instead',
      );
    }
  }
});
