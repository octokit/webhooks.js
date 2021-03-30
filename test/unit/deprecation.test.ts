import { Webhooks } from "../../src";

describe("Deprecated methods", () => {
  test("path parameter", () => {
    const warn = jest.fn();
    new Webhooks({
      secret: "secret",
      path: "/test",
      log: {
        debug: () => {},
        info: () => {},
        warn: warn,
        error: () => {},
      },
    });

    expect(warn).toHaveBeenCalledWith(
      "[@octokit/webhooks] `path` option is deprecated and will be removed in a future release of `@octokit/webhooks`. Please use `createNodeMiddleware(webhooks, { path })` instead"
    );
  });
});
