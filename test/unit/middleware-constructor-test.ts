import { createMiddleware as Middleware } from "../../src/middleware-legacy";

test("options: none", () => {
  expect(() => Middleware({})).toThrow();
});
