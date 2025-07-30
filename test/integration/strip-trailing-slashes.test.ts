import { describe, it, assert } from "../testrunner.ts";
import { stripTrailingSlashes } from "../../src/strip-trailing-slashes.ts";

describe("stripTrailingSlashes", () => {
  [
    ["", ""],
    ["/", "/"],
    ["//", "/"],
    ["///", "/"],
    ["/a", "/a"],
    ["/a/", "/a"],
    ["/a//", "/a"],
  ].forEach(([actual, expected]) => {
    it(`should strip trailing slashes from ${actual} to ${expected}`, () => {
      assert(
        stripTrailingSlashes(actual) === expected,
        `Expected ${actual} to be stripped to ${expected}, but got ${stripTrailingSlashes(actual)}`,
      );
    });
  });
});
