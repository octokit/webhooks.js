import { describe, it, assert } from "../testrunner.ts";
import { receiverHandle as receive } from "../../src/event-handler/receive.ts";
import type { State } from "../../src/types.ts";

const state: State = {
  secret: "mysecret",
  hooks: {},
  log: console,
};

describe("receive", () => {
  it("options: none", async () => {
    try {
      // @ts-expect-error
      await receive(state);
      assert(false);
    } catch (error) {
      assert(error instanceof Error);
      if (error instanceof Error) {
        assert(error.message === "Event name not passed");
      }
    }
  });

  it("options: name", async () => {
    try {
      // @ts-expect-error
      await receive(state, { name: "foo" });
      assert(false);
    } catch (error) {
      assert(error instanceof Error);
      if (error instanceof Error) {
        assert(error.message === "Event name not passed");
      }
    }
  });

  it("options: name, payload", async () => {
    // @ts-expect-error
    await receive(state, { name: "foo", payload: {} });
  });
});
