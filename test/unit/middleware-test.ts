import { IncomingMessage, ServerResponse } from "http";
import { middleware } from "../../src/middleware-legacy/middleware";
import { getPayload } from "../../src/middleware-legacy/get-payload";
import { verifyAndReceive } from "../../src/middleware-legacy/verify-and-receive";

jest.mock("../../src/middleware-legacy/get-payload");
jest.mock("../../src/middleware-legacy/verify-and-receive");

const mockGetPayload = getPayload as jest.Mock;
const mockVerifyAndReceive = verifyAndReceive as jest.Mock;

const headers = {
  "x-github-delivery": "123e4567-e89b-12d3-a456-426655440000",
  "x-github-event": "push",
  "x-hub-signature": "sha1=f4d795e69b5d03c139cc6ea991ad3e5762d13e2f",
};

test("next() callback", () => {
  const next = jest.fn();

  middleware(
    {
      hooks: {},
      log: console,
    },
    { method: "POST", url: "/foo" } as IncomingMessage,
    {} as ServerResponse,
    next
  );

  expect(next).toHaveBeenCalled();
});

describe("when does a timeout on retrieving the payload", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  test("successfully, does NOT response.end(ok)", async () => {
    const consoleDebugSpy = jest.spyOn(console, "debug").mockImplementation();
    const responseMock = ({ end: jest.fn() } as unknown) as ServerResponse;
    const next = jest.fn();

    mockGetPayload.mockResolvedValueOnce(undefined);
    mockVerifyAndReceive.mockResolvedValueOnce(undefined);

    const promiseMiddleware = middleware(
      { hooks: {}, path: "/foo", log: console },
      ({
        method: "POST",
        url: "/foo",
        headers,
      } as unknown) as IncomingMessage,
      responseMock,
      next
    );

    jest.runAllTimers();

    await promiseMiddleware;

    expect(next).not.toHaveBeenCalled();
    expect(consoleDebugSpy).toHaveBeenCalledTimes(1);
    expect(consoleDebugSpy).toHaveBeenLastCalledWith(
      "push event received (id: 123e4567-e89b-12d3-a456-426655440000)"
    );
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(responseMock.end).toHaveBeenCalledWith("still processing\n");
    expect(responseMock.end).not.toHaveBeenCalledWith("ok\n");
  });

  test("failing, does NOT response.end(ok)", async () => {
    const consoleDebugSpy = jest.spyOn(console, "debug").mockImplementation();
    const responseMock = ({ end: jest.fn() } as unknown) as ServerResponse;
    const next = jest.fn();

    mockGetPayload.mockResolvedValueOnce(undefined);
    mockVerifyAndReceive.mockRejectedValueOnce(new Error("random error"));

    const promiseMiddleware = middleware(
      { hooks: {}, path: "/foo", log: console },
      ({
        method: "POST",
        url: "/foo",
        headers,
      } as unknown) as IncomingMessage,
      responseMock,
      next
    );

    jest.runAllTimers();

    await promiseMiddleware;

    expect(next).not.toHaveBeenCalled();
    expect(consoleDebugSpy).toHaveBeenCalledTimes(1);
    expect(consoleDebugSpy).toHaveBeenLastCalledWith(
      "push event received (id: 123e4567-e89b-12d3-a456-426655440000)"
    );
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(responseMock.end).toHaveBeenCalledWith("still processing\n");
    expect(responseMock.end).not.toHaveBeenCalledWith(
      new Error("random error").toString()
    );
  });

  afterEach(() => {
    jest.clearAllTimers();
  });
});
