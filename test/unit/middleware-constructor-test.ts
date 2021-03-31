import { createMiddleware as Middleware } from "../../src/middleware-legacy";

test("options: none", () => {
  // @ts-expect-error
  expect(() => Middleware({})).toThrow();
});
