let describe: Function, it: Function, assert: Function;
if (process.env.VITEST_WORKER_ID) {
  describe = await import("vitest").then((module) => module.describe);
  it = await import("vitest").then((module) => module.it);
  assert = await import("vitest").then((module) => module.assert);
} else {
  const nodeTest = await import("node:test");
  const nodeAssert = await import("node:assert");

  describe = nodeTest.describe;
  it = nodeTest.it;
  assert = nodeAssert.strict;
}

export { describe, it, assert };
