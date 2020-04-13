const test = require("tap").test;

const Middleware = require("../../src/middleware");

test("options: none", (t) => {
  t.throws(Middleware);
  t.end();
});
