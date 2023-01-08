import { readFileSync } from "fs";
import { sign } from "@octokit/webhooks-methods";

import { Webhooks } from "../../src";

const pushEventPayloadString = readFileSync(
  "test/fixtures/push-payload.json",
  "utf-8"
);
let signatureSha256: string;
describe("Deprecations", () => {
  beforeAll(async () => {
    signatureSha256 = await sign(
      { secret: "mySecret", algorithm: "sha256" },
      pushEventPayloadString
    );
  });

  test("webhooks.verify(payload, signature) with object payload", async () => {
    const spy = jest.spyOn(console, "error");
    const secret = "mysecret";
    const webhooks = new Webhooks({ secret });

    await webhooks.verify(
      JSON.parse(pushEventPayloadString),
      await sign({ secret, algorithm: "sha256" }, pushEventPayloadString)
    );
    expect(spy).toBeCalledWith(
      "[@octokit/webhooks] Passing a JSON payload object to `verify()` is deprecated and the functionality will be removed in a future release of `@octokit/webhooks`"
    );
    spy.mockClear();
  });

  test("webhooks.verifyAndReceive(payload, signature) with object payload", async () => {
    const spy = jest.spyOn(console, "error");
    const secret = "mysecret";
    const webhooks = new Webhooks({ secret });

    await webhooks.verifyAndReceive({
      id: "123e456",
      name: "push",
      payload: JSON.parse(pushEventPayloadString),
      signature: await sign(
        { secret, algorithm: "sha256" },
        pushEventPayloadString
      ),
    });
    expect(spy).toBeCalledWith(
      "[@octokit/webhooks] Passing a JSON payload object to `verifyAndReceive()` is deprecated and the functionality will be removed in a future release of `@octokit/webhooks`"
    );
    spy.mockClear();
  });
});
