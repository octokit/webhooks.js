import simple from "simple-mock";
import { test } from "tap";
import { middleware } from "../../pkg/dist-src/middleware/middleware";

const state = {};

test("next() callback", (t) => {
  const next = simple.spy();

  middleware(state, { method: "POST", url: "/foo" }, {}, next);
  t.is(next.callCount, 1);
  t.end();
});
