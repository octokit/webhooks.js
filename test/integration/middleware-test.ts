import { EventEmitter } from "events";
import { Buffer } from "buffer";
import { createMiddleware } from "../../src/middleware-legacy";

enum RequestMethodType {
  POST = "POST",
  GET = "GET",
}

type RequestMock = EventEmitter & {
  method: RequestMethodType;
  headers: { [key: string]: string };
  url: string;
  setEncoding: jest.Mock<void, string[]>;
};

const headers = {
  "x-github-delivery": "123e4567-e89b-12d3-a456-426655440000",
  "x-github-event": "push",
  "x-hub-signature": "sha1=f4d795e69b5d03c139cc6ea991ad3e5762d13e2f",
};

test("Invalid payload", () => {
  const requestMock: RequestMock = Object.assign(new EventEmitter(), {
    method: RequestMethodType.POST,
    headers,
    url: "/",
    setEncoding: jest.fn(),
  });

  const responseMock = {
    end: jest.fn(),
    statusCode: 0,
  };

  const middleware = createMiddleware({ secret: "mysecret", log: {} });
  const middlewareDone = middleware(requestMock, responseMock).then(() => {
    expect(responseMock.statusCode).toBe(400);
    expect(responseMock.end).toHaveBeenCalledWith(
      expect.stringContaining("SyntaxError: Invalid JSON")
    );
    expect(requestMock.setEncoding).toHaveBeenCalledWith("utf8");
  });

  requestMock.emit("data", Buffer.from("foo"));
  requestMock.emit("end");

  return middlewareDone;
});

test("request error", () => {
  const requestMock: RequestMock = Object.assign(new EventEmitter(), {
    method: RequestMethodType.POST,
    headers,
    url: "/",
    setEncoding: jest.fn(),
  });

  const responseMock = {
    end: jest.fn(),
    statusCode: 0,
  };

  const middleware = createMiddleware({ secret: "mysecret", log: {} });
  const middlewareDone = middleware(requestMock, responseMock).then(() => {
    expect(responseMock.statusCode).toBe(500);
    expect(responseMock.end).toHaveBeenCalledWith(
      expect.stringContaining("Error: oops")
    );
    expect(requestMock.setEncoding).toHaveBeenCalledWith("utf8");
  });

  const error = new Error("oops");
  requestMock.emit("error", error);
  return middlewareDone;
});
