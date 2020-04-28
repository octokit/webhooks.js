const test = require("tap").test;

const { createMiddleware } = require("../../src");

test("options: none", (t) => {
  t.throws(createMiddleware);
  t.end();
});
