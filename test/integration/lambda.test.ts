import { describe, it, assert } from "../testrunner.ts";
import { createServer } from "node:http";
import { readFileSync } from "node:fs";
import type { AddressInfo } from "node:net";

import { sign } from "@octokit/webhooks-methods";

import { createNodeMiddleware, Webhooks } from "../../src/index.ts";
import { findFreePort } from "../helpers/find-free-port.ts";
import { concatUint8Array } from "../../src/middleware/common/concat-uint8array.ts";

const pushEventPayload = readFileSync(
  "test/fixtures/push-payload.json",
  "utf-8",
);

const signatureSha256: string = await sign("mySecret", pushEventPayload);

describe("createNodeMiddleware(webhooks)", () => {
  it("request.body already parsed (e.g. Lambda)", async () => {
    const webhooks = new Webhooks({
      secret: "mySecret",
    });
    const dataChunks: any[] = [];
    const middleware = createNodeMiddleware(webhooks);

    const server = createServer((req, res) => {
      req.on("data", (chunk) => dataChunks.push(chunk));
      req.on("end", () => {
        const payload = concatUint8Array(dataChunks);

        // @ts-expect-error - TS2339: Property 'body' does not exist on type 'IncomingMessage'.
        req.body = new TextDecoder("utf-8").decode(payload);
        middleware(req, res);
      });
    }).listen(await findFreePort());

    webhooks.on("push", (event) => {
      assert(event.id === "123e4567-e89b-12d3-a456-426655440000");
    });

    const { port } = server.address() as AddressInfo;

    const response = await fetch(
      `http://localhost:${port}/api/github/webhooks`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-GitHub-Delivery": "123e4567-e89b-12d3-a456-426655440000",
          "X-GitHub-Event": "push",
          "X-Hub-Signature-256": signatureSha256,
        },
        body: pushEventPayload,
      },
    );

    assert(response.status === 200);
    assert((await response.text()) === "ok\n");

    server.close();
  });
});
