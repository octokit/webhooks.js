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

    request.emit("data", Buffer.from("foobar"));
    request.emit("end");

    expect(await promise).toEqual("foobar");
  });

  it("resolves with a string when receiving multiple chunks", async () => {
    const request = new EventEmitter();
    const promise = getPayload(request);

    request.emit("data", Buffer.from("foo"));
    request.emit("data", Buffer.from("bar"));
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

    const doubleByteBuffer = Buffer.from("ݔ");
    request.emit("data", doubleByteBuffer.subarray(0, 1));
    request.emit("data", doubleByteBuffer.subarray(1, 2));
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
    request.emit("data", Buffer.from("bar"));
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
    request.emit("data", Buffer.from("bar"));
    request.emit("end");

    expect(await promise).toEqual("bar");
  });

  it("should not throw an error if non-valid utf-8 payload was received", async () => {
    const request = new EventEmitter();

    const promise = getPayload(request);

    request.emit("data", new Uint8Array([226]));
    request.emit("end");

    expect(await promise).toEqual("�");
  });
});
