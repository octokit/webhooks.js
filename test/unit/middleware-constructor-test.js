const test = require("tap").test;

const Middleware = require("../../pkg/dist-src/middleware");

test("options: none", (t) => {
  t.throws(Middleware);
  t.end();
});
