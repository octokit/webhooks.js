import { describe, it, assert } from "../testrunner.ts";

import { concatUint8Array } from "../../src/concat-uint8array.ts";

describe("concatUint8Array", () => {
  it("returns an empty array when no data is provided", () => {
    const result = concatUint8Array([]);
    assert(result.length === 0);
  });

  it("returns a single Uint8Array when one Uint8Array is provided", () => {
    const data = new Uint8Array([1, 2, 3]);
    const result = concatUint8Array([data]);
    assert(data !== result);
    assert(result.length === 3);
    assert(result[0] === 1);
    assert(result[1] === 2);
    assert(result[2] === 3);
  });

  it("concatenates multiple Uint8Arrays into a single Uint8Array", () => {
    const data = [
      new Uint8Array([1, 2]),
      new Uint8Array([3, 4]),
      new Uint8Array([5, 6]),
    ];
    const result = concatUint8Array(data);

    assert(data[0] !== result);
    assert(data[1] !== result);
    assert(data[2] !== result);

    assert(result.length === 6);
    assert(result[0] === 1);
    assert(result[1] === 2);
    assert(result[2] === 3);
    assert(result[3] === 4);
    assert(result[4] === 5);
    assert(result[5] === 6);
  });
});
