import { receiverHandle as receive } from "../../src/event-handler/receive";
import { State } from "../../src/types";

const state: State = {
  secret: "mysecret",
  hooks: {},
};

test("options: none", () => {
  expect(receive(state)).toThrow();
});

test("options: name", () => {
  expect(receive(state, { name: "foo" })).toThrow();
});

test("options: name, payload", () => {
  expect(receive(state, { name: "foo", payload: {} })).not.toThrow();
});

test("options: [name1, name2]", () => {
  expect(
    receive(state, {
      name: ["foo", "bar"],
    })
  ).toThrow();
});

test("options: [name1, name2], payload", () => {
  expect(
    receive(state, {
      name: ["foo", "bar"],
      payload: {},
    })
  ).not.toThrow();
});
