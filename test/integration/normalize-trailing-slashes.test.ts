import { describe, it, assert } from "../testrunner.ts";
import { normalizeTrailingSlashes } from "../../src/normalize-trailing-slashes.ts";

describe("normalizeTrailingSlashes", () => {
  [
    ["", "/"],
    ["/", "/"],
    ["//", "/"],
    ["///", "/"],
    ["/a", "/a"],
    ["/a/", "/a"],
    ["/a//", "/a"],
  ].forEach(([actual, expected]) => {
    it(`should normalize trailing slashes from ${actual} to ${expected}`, () => {
      assert(
        normalizeTrailingSlashes(actual) === expected,
        `Expected ${actual} to be stripped to ${expected}, but got ${normalizeTrailingSlashes(actual)}`,
      );
    });
  });
});
