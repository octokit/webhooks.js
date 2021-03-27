import { createWebhooksApi } from "../../src";

describe("Deprecated methods", () => {
  test("createWebhooksApi", () => {
    const spy = jest.spyOn(console, "error");
    createWebhooksApi({ secret: "foo" });
    expect(spy).toBeCalledWith(
      "[@octokit/webhooks] `createWebhooksApi()` is deprecated and will be removed in a future release of `@octokit/webhooks`, please use the `Webhooks` class instead"
    );
    spy.mockClear();
  });
});
