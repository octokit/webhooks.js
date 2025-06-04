declare global {
  var Bun: any;
}

let describe: Function, it: Function, assert: Function, deepEqual: Function;
if ("Bun" in globalThis) {
  describe = function describe(name: string, fn: Function) {
    return globalThis.Bun.jest(caller()).describe(name, fn);
  };
  it = function it(name: string, fn: Function) {
    return globalThis.Bun.jest(caller()).it(name, fn);
  };
  assert = function assert(value: unknown, message?: string) {
    return globalThis.Bun.jest(caller()).expect(value, message);
  };
  /** Retrieve caller test file. */
  function caller() {
    const Trace = Error as unknown as {
      prepareStackTrace: (error: Error, stack: CallSite[]) => unknown;
    };
    const _ = Trace.prepareStackTrace;
    Trace.prepareStackTrace = (_, stack) => stack;
    const { stack } = new Error();
    Trace.prepareStackTrace = _;
    const caller = (stack as unknown as CallSite[])[2];
    return caller.getFileName().replaceAll("\\", "/");
  }

  /** V8 CallSite (subset). */
  type CallSite = { getFileName: () => string };
} else if ("Deno" in globalThis) {
  const nodeTest = await import("node:test");
  const nodeAssert = await import("node:assert");

  describe = nodeTest.describe;
  it = nodeTest.it;
  assert = nodeAssert.strict;
  deepEqual = nodeAssert.deepStrictEqual;
} else if (process.env.VITEST_WORKER_ID) {
  describe = await import("vitest").then((module) => module.describe);
  it = await import("vitest").then((module) => module.it);
  assert = await import("vitest").then((module) => module.assert);
  deepEqual = await import("vitest").then(
    (module) => (expected: any, actual: any) =>
      module.expect(actual).toEqual(expected),
  );
} else {
  const nodeTest = await import("node:test");
  const nodeAssert = await import("node:assert");

  describe = nodeTest.describe;
  it = nodeTest.it;
  assert = nodeAssert.strict;
  deepEqual = nodeAssert.deepStrictEqual;
}

export { describe, it, assert, deepEqual };
