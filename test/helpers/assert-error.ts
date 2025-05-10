import { assert } from "../testrunner.ts";

export function assertError<T>(
  error: unknown,
  baseError: ErrorConstructor | AggregateErrorConstructor,
): asserts error is T {
  assert(error instanceof (baseError as any));
}
