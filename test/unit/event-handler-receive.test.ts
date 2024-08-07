import { test, expect } from "vitest";
import { receiverHandle as receive } from "../../src/event-handler/receive.ts";
import type { State } from "../../src/types.ts";

const state: State = {
  secret: "mysecret",
  hooks: {},
  log: console,
};

test("options: none", () => {
  // @ts-expect-error
  expect(() => receive(state)).toThrow();
});

test("options: name", () => {
  expect(() => {
    // @ts-expect-error
    receive(state, { name: "foo" });
  }).toThrow();
});

test("options: name, payload", () => {
  expect(() => {
    // @ts-expect-error
    receive(state, { name: "foo", payload: {} });
  }).not.toThrow();
});
