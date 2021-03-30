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

  test("webhooks.middleware", () => {
    expect.assertions(2);

    const warn = jest.fn();
    const webhooks = new Webhooks({
      secret: "secret",
      log: {
        debug: () => {},
        info: () => {},
        warn: warn,
        error: () => {},
      },
    });

    try {
      // @ts-expect-error
      webhooks.middleware();
    } catch (error) {
      expect(error.message).toEqual(
        "Cannot read property 'method' of undefined"
      );
    }

    expect(warn).toHaveBeenCalledWith(
      "[@octokit/webhooks] `webhooks.middleware` is deprecated and will be removed in a future release of `@octokit/webhooks`. Please use `createNodeMiddleware(webhooks)` instead"
    );
  });
});
