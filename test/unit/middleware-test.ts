import simple from "simple-mock";
import { middleware } from "../../src/middleware/middleware";
import { State } from "../../src/types";

const state: State = {
  hooks: {},
};

test("next() callback", () => {
  const next = simple.spy();

  middleware(state, { method: "POST", url: "/foo" }, {}, next);
  expect(next.callCount).toBe(1);
});
