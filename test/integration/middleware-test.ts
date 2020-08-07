import EventEmitter from "events";
import { Buffer } from "buffer";
import simple from "simple-mock";
import { createMiddleware } from "../../src/middleware";

const headers = {
  "x-github-delivery": "123e4567-e89b-12d3-a456-426655440000",
  "x-github-event": "push",
  "x-hub-signature": "sha1=f4d795e69b5d03c139cc6ea991ad3e5762d13e2f",
};

test("Invalid payload", (t) => {
  const requestMock = new EventEmitter();
  requestMock.method = "POST";
  requestMock.headers = headers;
  requestMock.url = "/";

  const responseMock = {
    end: simple.spy(),
  };

  const middleware = createMiddleware({ secret: "mysecret" });
  middleware(requestMock, responseMock).then(() => {
    expect(responseMock.statusCode).toBe(400);
    expect(responseMock.end.lastCall.arg).toMatch(/SyntaxError: Invalid JSON/);
  });

  requestMock.emit("data", Buffer.from("foo"));
  requestMock.emit("end");
});

test("request error", (t) => {
  const requestMock = new EventEmitter();
  requestMock.method = "POST";
  requestMock.headers = headers;
  requestMock.url = "/";

  const responseMock = {
    end: simple.spy(),
  };

  const middleware = createMiddleware({ secret: "mysecret" });
  middleware(requestMock, responseMock).then(() => {
    expect(responseMock.statusCode).toBe(500);
    expect(responseMock.end.lastCall.arg).toMatch(/Error: oops/);
  });

  const error = new Error("oops");
  requestMock.emit("error", error);
});
