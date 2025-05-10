import { describe, it, assert } from "../testrunner.ts";
import { removeListener } from "../../src/event-handler/remove-listener.ts";
import type { State } from "../../src/types.ts";

describe("remove-listener", () => {
  it("no listener", async () => {
    const push = () => {};
    const state: State = {
      hooks: {
        push: [],
      },
      log: console,
    };

    removeListener(state, "push", push);

    assert(state.hooks.push.length === 0);
    assert(state.log === console);
  });

  it("single listener", () => {
    const push = () => {};

    const state: State = {
      hooks: {
        push: [push],
      },
      log: console,
    };

    removeListener(state, "push", push);
    assert(state.hooks.push.length === 0);
    assert(state.log === console);
  });

  it("multiple listeners", () => {
    const push1 = () => {};
    const push2 = () => {};
    const push3 = () => {};

    const ping = () => {};

    const state: State = {
      hooks: {
        push: [push1, push2, push3],
        ping: [ping],
      },
      log: console,
    };

    removeListener(state, "push", push1);
    removeListener(state, "push", push2);
    removeListener(state, "push", push3);

    assert(state.hooks.push.length === 0);
    assert(state.hooks.ping.length === 1);
    assert(state.hooks.ping[0] === ping);
    assert(state.log === console);
  });
});
