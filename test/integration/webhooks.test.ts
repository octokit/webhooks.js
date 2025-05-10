import { describe, it, assert } from "../testrunner.ts";
import { readFileSync } from "node:fs";
import { sign } from "@octokit/webhooks-methods";

import { Webhooks } from "../../src/index.ts";

const pushEventPayloadString = readFileSync(
  "test/fixtures/push-payload.json",
  "utf-8",
);

describe("Webhooks", () => {
  it("new Webhooks() without secret option", () => {
    try {
      // @ts-expect-error
      new Webhooks();
      assert(false);
    } catch (error) {
      assert(error instanceof Error);
      if (error instanceof Error) {
        assert(error.message === "[@octokit/webhooks] options.secret required");
      }
    }
  });

  it("webhooks.sign(payload) with string payload", async () => {
    const secret = "mysecret";
    const webhooks = new Webhooks({ secret });

    await webhooks.sign(pushEventPayloadString);
  });

  it("webhooks.verify(payload, signature) with string payload", async () => {
    const secret = "mysecret";
    const webhooks = new Webhooks({ secret });

    await webhooks.verify(
      pushEventPayloadString,
      await sign(secret, pushEventPayloadString),
    );
  });

  it("webhooks.verifyAndReceive({ ...event, signature }) with string payload", async () => {
    const secret = "mysecret";
    const webhooks = new Webhooks({ secret });

    await webhooks.verifyAndReceive({
      id: "1",
      name: "push",
      payload: pushEventPayloadString,
      signature: await sign(secret, pushEventPayloadString),
    });
  });

  it("webhooks.verifyAndReceive(event) with incorrect signature", async () => {
    const webhooks = new Webhooks({ secret: "mysecret" });

    const pingPayload = "{}";

    try {
      await webhooks.verifyAndReceive({
        id: "1",
        name: "ping",
        payload: pingPayload,
        signature: "nope",
      });
    } catch (error) {
      if (error instanceof AggregateError === false) {
        assert(false);
        return;
      }
      assert(
        error.message ===
          "[@octokit/webhooks] signature does not match event payload and secret",
      );
      assert(error.errors.length === 1);
      assert(error.errors[0] instanceof Error);
      assert(
        error.errors[0].message ===
          "[@octokit/webhooks] signature does not match event payload and secret",
      );
    }
  });

  it("webhooks.receive(error)", async () => {
    const webhooks = new Webhooks({ secret: "mysecret" });

    webhooks.onError((error) => {
      assert(/oops/.test(error.message));
    });

    try {
      // @ts-expect-error
      await webhooks.receive(new Error("oops"));
      assert(false);
    } catch (error) {
      if (error instanceof AggregateError === false) {
        assert(false);
        return;
      }
      assert(error.message === "oops");
      assert(error.errors.length === 1);
      assert(error.errors[0] instanceof Error);
      assert(error.errors[0].message === "oops");
    }
  });
});
