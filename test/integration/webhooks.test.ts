import { Webhooks, EmitterWebhookEvent } from "../../src";

describe("Webhooks", () => {
  test("new Webhooks() without secret option", () => {
    // @ts-expect-error
    expect(() => new Webhooks()).toThrow(
      "[@octokit/webhooks] options.secret required"
    );
  });

  test("webhooks.verifyAndReceive(event) with incorrect signature", async () => {
    const webhooks = new Webhooks({ secret: "mysecret" });

    const pingPayload = {} as EmitterWebhookEvent<"ping">["payload"];
    await expect(async () =>
      webhooks.verifyAndReceive({
        id: "1",
        name: "ping",
        payload: pingPayload,
        signature: "nope",
      })
    ).rejects.toThrow(
      "[@octokit/webhooks] signature does not match event payload and secret"
    );
  });

  test("webhooks.receive(error)", async () => {
    const webhooks = new Webhooks({ secret: "mysecret" });

    webhooks.onError((error) => {
      expect(error.message).toMatch(/oops/);
    });

    await expect(async () =>
      // @ts-expect-error
      webhooks.receive(new Error("oops"))
    ).rejects.toThrow();
  });
});
