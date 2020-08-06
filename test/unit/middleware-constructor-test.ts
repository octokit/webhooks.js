import { createMiddleware as Middleware } from "../../src/middleware";

test("options: none", () => {
  expect(Middleware()).toThrow();
});
