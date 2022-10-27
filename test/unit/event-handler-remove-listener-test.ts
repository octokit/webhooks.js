import {
  removeListener,
  removeAllListeners,
} from "../../src/event-handler/remove-listener";
import { State } from "../../src/types";

test("remove-listener: single listener", () => {
  const push = () => {};

  const state: State = {
    hooks: {
      push: [push],
    },
    log: console,
  };

  expect(() => removeListener(state, "push", push)).not.toThrow();
  expect(state).toStrictEqual({ hooks: { push: [] }, log: console });
});

test("remove-listener: multiple listeners", () => {
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

  expect(() => {
    removeListener(state, "push", push1);
    removeListener(state, "push", push2);
    removeListener(state, "push", push3);
  }).not.toThrow();
  expect(state).toStrictEqual({
    hooks: { push: [], ping: [ping] },
    log: console,
  });
});

test("remove-all-listeners: single event", () => {
  const push = () => {};

  const state: State = {
    hooks: {
      push: [push],
    },
  };

  expect(() => removeAllListeners(state, "push")).not.toThrow();
  expect(state).toStrictEqual({ hooks: { push: [] } });
});

test("remove-all-listeners: multiple events", () => {
  const push = () => {};
  const status = () => {};

  const state: State = {
    hooks: {
      push: [push],
      status: [status],
    },
  };

  expect(() => removeAllListeners(state, ["push", "status"])).not.toThrow();
  expect(state).toStrictEqual({ hooks: { push: [], status: [] } });
});

test("remove-all-listeners: event with no listeners", () => {
  const state: State = {
    hooks: {},
  };

  expect(() => removeAllListeners(state, "push")).not.toThrow();
});
