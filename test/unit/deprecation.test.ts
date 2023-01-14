import { createServer } from "http";
import { readFileSync } from "fs";

import fetch from "node-fetch";
import { sign } from "@octokit/webhooks-methods";

import { Webhooks, createNodeMiddleware } from "../../src";

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
  test("onUnhandledRequest", async () => {
    const spy = jest.spyOn(console, "warn");
    const webhooks = new Webhooks({
      secret: "mySecret",
    });

    const server = createServer(
      createNodeMiddleware(webhooks, {
        onUnhandledRequest(_request, response) {
          response.writeHead(404);
          response.end("nope");
        },
      })
    ).listen();

    // @ts-expect-error complains about { port } although it's included in returned AddressInfo interface
    const { port } = server.address();

    await fetch(`http://localhost:${port}/api/github/webhooks`, {
      method: "PUT",
      headers: {
        "X-GitHub-Delivery": "123e4567-e89b-12d3-a456-426655440000",
        "X-GitHub-Event": "push",
        "X-Hub-Signature-256": signatureSha256,
      },
      body: "invalid",
    });

    expect(spy).toBeCalledWith(
      "[@octokit/webhooks] `onUnhandledRequest()` is deprecated and will be removed in a future release of `@octokit/webhooks`"
    );
    spy.mockClear();
    server.close();
  });

  test("webhooks.verify(payload, signature) with object payload", async () => {
    const spy = jest.spyOn(console, "warn");
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
    const spy = jest.spyOn(console, "warn");
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
