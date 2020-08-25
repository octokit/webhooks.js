import { IncomingMessage, ServerResponse } from "http";
import { middleware } from "../../src/middleware/middleware";
import { getMissingHeaders } from "../../src/middleware/get-missing-headers";
import { getPayload } from "../../src/middleware/get-payload";
import { verifyAndReceive } from "../../src/middleware/verify-and-receive";

jest.mock("../../src/middleware/get-missing-headers");
jest.mock("../../src/middleware/get-payload");
jest.mock("../../src/middleware/verify-and-receive");

const mockGetMissingHeaders = getMissingHeaders as jest.Mock;
const mockGetPayload = getPayload as jest.Mock;
const mockVerifyAndReceive = verifyAndReceive as jest.Mock;

test("next() callback", () => {
  const next = jest.fn();

  middleware(
    {
      hooks: {},
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

  test("successfully, does NOT respone.end(ok)", async () => {
    const responseMock = ({ end: jest.fn() } as unknown) as ServerResponse;
    const next = jest.fn();

    mockGetMissingHeaders.mockReturnValueOnce([]);
    mockGetPayload.mockResolvedValueOnce(undefined);
    mockVerifyAndReceive.mockResolvedValueOnce(undefined);

    const promiseMiddleware = middleware(
      { hooks: {}, path: "/foo" },
      {
        method: "POST",
        url: "/foo",
        headers: {},
      } as IncomingMessage,
      responseMock,
      next
    );

    jest.runAllTimers();

    await promiseMiddleware;

    expect(next).not.toHaveBeenCalled();
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(responseMock.end).toHaveBeenCalledWith("still processing\n");
    expect(responseMock.end).not.toHaveBeenCalledWith("ok\n");
  });

  test("failing, does NOT respone.end(ok)", async () => {
    const responseMock = ({ end: jest.fn() } as unknown) as ServerResponse;
    const next = jest.fn();

    mockGetMissingHeaders.mockReturnValueOnce([]);
    mockGetPayload.mockResolvedValueOnce(undefined);
    mockVerifyAndReceive.mockRejectedValueOnce(new Error("random error"));

    const promiseMiddleware = middleware(
      { hooks: {}, path: "/foo" },
      {
        method: "POST",
        url: "/foo",
        headers: {},
      } as IncomingMessage,
      responseMock,
      next
    );

    jest.runAllTimers();

    await promiseMiddleware;

    expect(next).not.toHaveBeenCalled();
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
