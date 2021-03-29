import { createServer } from "http";

import fetch from "node-fetch";

import { Webhooks, createNodeMiddleware, sign } from "../../src";
import { EmitterWebhookEvent } from "../../src/types";
import { pushEventPayload } from "../fixtures";

const signatureSha256 = sign(
  { secret: "mySecret", algorithm: "sha256" },
  JSON.stringify(pushEventPayload)
);

describe("createNodeMiddleware(webhooks)", () => {
  it("README example", async () => {
    expect.assertions(3);

    const webhooks = new Webhooks<EmitterWebhookEvent>({
      secret: "mySecret",
    });

    webhooks.on("push", (event) => {
      expect(event.id).toBe("123e4567-e89b-12d3-a456-426655440000");
    });

    const server = createServer(createNodeMiddleware(webhooks)).listen();

    // @ts-expect-error complains about { port } although it's included in returned AddressInfo interface
    const { port } = server.address();

    const response = await fetch(
      `http://localhost:${port}/api/github/webhooks`,
      {
        method: "POST",
        headers: {
          "X-GitHub-Delivery": "123e4567-e89b-12d3-a456-426655440000",
          "X-GitHub-Event": "push",
          "X-Hub-Signature-256": signatureSha256,
        },
        body: JSON.stringify(pushEventPayload),
      }
    );

    expect(response.status).toEqual(200);
    await expect(await response.text()).toEqual("ok\n");

    server.close();
  });

  test("request.body already parsed (e.g. Lambda)", async () => {
    expect.assertions(3);

    const webhooks = new Webhooks<EmitterWebhookEvent>({
      secret: "mySecret",
    });
    const dataChunks: any[] = [];
    const middleware = createNodeMiddleware(webhooks);

    const server = createServer((req, res) => {
      req.once("data", (chunk) => dataChunks.push(chunk));
      req.once("end", () => {
        req.body = JSON.parse(Buffer.concat(dataChunks).toString());
        middleware(req, res);
      });
    }).listen();

    webhooks.on("push", (event) => {
      expect(event.id).toBe("123e4567-e89b-12d3-a456-426655440000");
    });

    // @ts-expect-error complains about { port } although it's included in returned AddressInfo interface
    const { port } = server.address();

    const response = await fetch(
      `http://localhost:${port}/api/github/webhooks`,
      {
        method: "POST",
        headers: {
          "X-GitHub-Delivery": "123e4567-e89b-12d3-a456-426655440000",
          "X-GitHub-Event": "push",
          "X-Hub-Signature-256": signatureSha256,
        },
        body: JSON.stringify(pushEventPayload),
      }
    );

    expect(response.status).toEqual(200);
    expect(await response.text()).toEqual("ok\n");

    server.close();
  });
});
