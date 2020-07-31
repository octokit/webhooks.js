import { test } from "tap";
import { createMiddleware as Middleware } from "../../pkg/dist-src/middleware";

test("options: none", (t) => {
  t.throws(Middleware);
  t.end();
});
