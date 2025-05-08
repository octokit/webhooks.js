import { describe, it, expect } from "vitest";
import EventEmitter from "node:events";
import { getPayload } from "../../src/middleware/node/get-payload.ts";

describe("getPayload", () => {
  it("returns a promise", () => {
    const request = new EventEmitter();
    const promise = getPayload(request);

    expect(promise).toBeInstanceOf(Promise);
  });

  it("resolves with a string when only receiving no chunk", async () => {
    const request = new EventEmitter();
    const promise = getPayload(request);

    request.emit("end");

    expect(await promise).toEqual("");
  });

  it("resolves with a string when only receiving one chunk", async () => {
    const request = new EventEmitter();
    const promise = getPayload(request);

    request.emit("data", new Uint8Array([0x66, 0x6f, 0x6f, 0x62, 0x61, 0x72])); // foobar
    request.emit("end");

    expect(await promise).toEqual("foobar");
  });

  it("resolves with a string when receiving multiple chunks", async () => {
    const request = new EventEmitter();
    const promise = getPayload(request);

    request.emit("data", new Uint8Array([0x66, 0x6f, 0x6f])); // foo
    request.emit("data", new Uint8Array([0x62, 0x61, 0x72])); // bar
    request.emit("end");

    expect(await promise).toEqual("foobar");
  });

  it("rejects with an error", async () => {
    const request = new EventEmitter();
    const promise = getPayload(request);

    request.emit("error", new Error("test"));

    await expect(promise).rejects.toThrow("test");
  });

  it("resolves with a string with respecting the utf-8 encoding", async () => {
    const request = new EventEmitter();
    const promise = getPayload(request);

    const doubleByteChar = new Uint8Array([0xdd, 0x94]); // "ݔ"
    request.emit("data", doubleByteChar.subarray(0, 1));
    request.emit("data", doubleByteChar.subarray(1, 2));
    request.emit("end");

    expect(await promise).toEqual("ݔ");
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

    expect(await promise).toEqual("foo");
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

    expect(await promise).toEqual("bar");
  });
});
