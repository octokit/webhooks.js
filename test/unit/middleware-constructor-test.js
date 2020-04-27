const test = require("tap").test;

const { createMiddleware } = require("../../lib");

test("options: none", (t) => {
  t.throws(createMiddleware);
  t.end();
});
