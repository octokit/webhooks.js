import { describe, it, assert } from "../testrunner.ts";
import EventEmitter from "node:events";
import { getPayload } from "../../src/middleware/node/get-payload.ts";
import { assertError } from "../helpers/assert-error.ts";

describe("getPayload", () => {
  it("returns a promise", () => {
    const request = new EventEmitter();
    const promise = getPayload(request);

    assert(promise instanceof Promise);
  });

  it("resolves with a string when only receiving no chunk", async () => {
    const request = new EventEmitter();
    const promise = getPayload(request);

    request.emit("end");

    assert((await promise) === "");
  });

  it("resolves with a string when only receiving one chunk", async () => {
    const request = new EventEmitter();
    const promise = getPayload(request);

    request.emit("data", new Uint8Array([0x66, 0x6f, 0x6f, 0x62, 0x61, 0x72])); // foobar
    request.emit("end");

    assert((await promise) === "foobar");
  });

  it("resolves with a string when receiving multiple chunks", async () => {
    const request = new EventEmitter();
    const promise = getPayload(request);

    request.emit("data", new Uint8Array([0x66, 0x6f, 0x6f])); // foo
    request.emit("data", new Uint8Array([0x62, 0x61, 0x72])); // bar
    request.emit("end");

    assert((await promise) === "foobar");
  });

  it("rejects with an error", async () => {
    const request = new EventEmitter();
    const promise = getPayload(request);

    request.emit("error", new Error("test"));

    try {
      await promise;
      assert(false);
    } catch (error) {
      assertError<AggregateError>(error, AggregateError);
      assert(error.message === "test");
      assert(error.errors.length === 1);
      assert(error.errors[0] instanceof Error);
      assert(error.errors[0].message === "test");
    }
  });

  it("resolves with a string with respecting the utf-8 encoding", async () => {
    const request = new EventEmitter();
    const promise = getPayload(request);

    const doubleByteChar = new Uint8Array([0xdd, 0x94]); // "ݔ"
    request.emit("data", doubleByteChar.subarray(0, 1));
    request.emit("data", doubleByteChar.subarray(1, 2));
    request.emit("end");

    assert((await promise) === "ݔ");
  });

  it("resolves with the body, if passed via the request", async () => {
    const request = new EventEmitter();
    // @ts-ignore body is not part of EventEmitter, which we are using
    // to mock the request object
    request.body = "foo";

    const promise = getPayload(request);

    // we emit data, to ensure that the body attribute is preferred
    request.emit("data", new Uint8Array([0x62, 0x61, 0x72])); // bar
    request.emit("end");

    assert((await promise) === "foo");
  });

  it("resolves with a string if the body key of the request is defined but value is undefined", async () => {
    const request = new EventEmitter();
    // @ts-ignore body is not part of EventEmitter, which we are using
    // to mock the request object
    request.body = undefined;

    const promise = getPayload(request);

    // we emit data, to ensure that the body attribute is preferred
    request.emit("data", new Uint8Array([0x62, 0x61, 0x72])); // bar
    request.emit("end");

    assert(await promise, "bar");
  });
});
