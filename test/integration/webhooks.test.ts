import { readFileSync } from "fs";

import { sign } from "@octokit/webhooks-methods";

import { Webhooks } from "../../src";

const pushEventPayloadString = readFileSync(
  "test/fixtures/push-payload.json",
  "utf-8"
);

describe("Webhooks", () => {
  test("new Webhooks() without secret option", () => {
    // @ts-expect-error
    expect(() => new Webhooks()).toThrow(
      "[@octokit/webhooks] options.secret required"
    );
  });

  test("webhooks.sign(payload) with string payload", async () => {
    const secret = "mysecret";
    const webhooks = new Webhooks({ secret });

    await webhooks.sign(pushEventPayloadString);
  });

  test("webhooks.verify(payload, signature) with string payload", async () => {
    const secret = "mysecret";
    const webhooks = new Webhooks({ secret });

    await webhooks.verify(
      pushEventPayloadString,
      await sign({ secret, algorithm: "sha256" }, pushEventPayloadString)
    );
  });

  test("webhooks.verifyAndReceive({ ...event, signature }) with string payload", async () => {
    const secret = "mysecret";
    const webhooks = new Webhooks({ secret });

    await webhooks.verifyAndReceive({
      id: "1",
      name: "push",
      payload: pushEventPayloadString,
      signature: await sign(
        { secret, algorithm: "sha256" },
        pushEventPayloadString
      ),
    });
  });

  test("webhooks.verifyAndReceive(event) with incorrect signature", async () => {
    const webhooks = new Webhooks({ secret: "mysecret" });

    const pingPayload = "{}";
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
