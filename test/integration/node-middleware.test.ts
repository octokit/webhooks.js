import { describe, it, assert } from "../testrunner.ts";
import { createServer } from "node:http";
import { readFileSync } from "node:fs";
import type { AddressInfo } from "node:net";

import { sign } from "@octokit/webhooks-methods";

import { createNodeMiddleware, Webhooks } from "../../src/index.ts";
import { instantiateTestServer } from "../helpers/test-server.ts";
import { findFreePort } from "../helpers/find-free-port.ts";

const pushEventPayload = readFileSync(
  "test/fixtures/push-payload.json",
  "utf-8",
);

const noop = () => {};

const signatureSha256: string = await sign("mySecret", pushEventPayload);

const runtimes: ("Node" | "Deno")[] = ["Node"];
const targets: ("Node" | "Web")[] = ["Node"];

if (typeof Deno !== "undefined") {
  runtimes.push("Deno");
  targets.push("Web");
}

runtimes.forEach((runtime) => {
  targets.forEach((target) => {
    if (runtime === "Node" && target === "Web") {
      return;
    }

    describe(`create${target}Middleware - ${runtime}`, () => {
      it("README example", async () => {
        const webhooks = new Webhooks({
          secret: "mySecret",
        });

        webhooks.on("push", (event) => {
          assert(event.id === "123e4567-e89b-12d3-a456-426655440000");
        });

        const { port, closeTestServer } = await instantiateTestServer(
          runtime,
          target,
          webhooks,
        );

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

        closeTestServer();
      });

      it("Handles invalid Content-Type", async () => {
        const webhooks = new Webhooks({
          secret: "mySecret",
        });

        const { port, closeTestServer } = await instantiateTestServer(
          runtime,
          target,
          webhooks,
        );
        const response = await fetch(
          `http://localhost:${port}/api/github/webhooks`,
          {
            method: "POST",
            headers: {
              "Content-Type": "text/plain",
              "X-GitHub-Delivery": "123e4567-e89b-12d3-a456-426655440000",
              "X-GitHub-Event": "push",
              "X-Hub-Signature-256": signatureSha256,
            },
            body: pushEventPayload,
          },
        );

        assert(response.status === 415);
        assert(
          (await response.text()) ===
            '{"error":"Unsupported \\"Content-Type\\" header value. Must be \\"application/json\\""}',
        );

        closeTestServer();
      });

      it("Handles Missing Content-Type", async () => {
        const webhooks = new Webhooks({
          secret: "mySecret",
        });

        const { port, closeTestServer } = await instantiateTestServer(
          runtime,
          target,
          webhooks,
        );
        const response = await fetch(
          `http://localhost:${port}/api/github/webhooks`,
          {
            method: "POST",
            headers: {
              "X-GitHub-Delivery": "123e4567-e89b-12d3-a456-426655440000",
              "X-GitHub-Event": "push",
              "X-Hub-Signature-256": signatureSha256,
            },
            body: pushEventPayload,
          },
        );

        assert(response.status === 415);
        assert(
          (await response.text()) ===
            '{"error":"Unsupported \\"Content-Type\\" header value. Must be \\"application/json\\""}',
        );

        closeTestServer();
      });

      it("Handles invalid JSON", async () => {
        const webhooks = new Webhooks({
          secret: "mySecret",
        });

        const log = {
          debug: noop,
          info: noop,
          warn: noop,
          error: (error: AggregateError) => {
            assert(error instanceof AggregateError);
            assert(error.errors.length === 1);
            assert(error.errors[0] instanceof SyntaxError);
            assert(error.errors[0].message === "Invalid JSON");
          },
        };

        const { port, closeTestServer } = await instantiateTestServer(
          runtime,
          target,
          webhooks,
          { log },
        );

        const payload = '{"name":"invalid"';

        const response = await fetch(
          `http://localhost:${port}/api/github/webhooks`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-GitHub-Delivery": "123e4567-e89b-12d3-a456-426655440000",
              "X-GitHub-Event": "push",
              "X-Hub-Signature-256": await sign("mySecret", payload),
            },
            body: payload,
          },
        );

        assert(response.status === 400);
        assert(
          (await response.text()) === '{"error":"SyntaxError: Invalid JSON"}',
        );

        closeTestServer();
      });

      it("Handles non POST request", async () => {
        const webhooks = new Webhooks({
          secret: "mySecret",
        });

        const { port, closeTestServer } = await instantiateTestServer(
          runtime,
          target,
          webhooks,
        );

        const response = await fetch(
          `http://localhost:${port}/api/github/webhooks`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "X-GitHub-Delivery": "123e4567-e89b-12d3-a456-426655440000",
              "X-GitHub-Event": "push",
              "X-Hub-Signature-256": signatureSha256,
            },
            body: "invalid",
          },
        );

        assert(response.status === 404);
        assert(
          (await response.text()) ===
            '{"error":"Unknown route: PUT /api/github/webhooks"}',
        );

        closeTestServer();
      });

      it("handle unhandled requests", async () => {
        const webhooks = new Webhooks({
          secret: "mySecret",
        });

        const middleware = createNodeMiddleware(webhooks, {});
        const server = createServer(async (req, res) => {
          if (!(await middleware(req, res))) {
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.write("nope.");
            res.end();
          }
        }).listen(await findFreePort());

        const { port } = server.address() as AddressInfo;

        const response = await fetch(`http://localhost:${port}/foo`, {
          method: "PUT",
          headers: {
            "X-GitHub-Delivery": "123e4567-e89b-12d3-a456-426655440000",
            "X-GitHub-Event": "push",
            "X-Hub-Signature-256": signatureSha256,
          },
          body: "invalid",
        });

        assert(response.status === 404);
        assert((await response.text()) === "nope.");

        server.close();
      });

      it("Handles missing headers", async () => {
        const webhooks = new Webhooks({
          secret: "mySecret",
        });

        const { port, closeTestServer } = await instantiateTestServer(
          runtime,
          target,
          webhooks,
        );

        const response = await fetch(
          `http://localhost:${port}/api/github/webhooks`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-GitHub-Delivery": "123e4567-e89b-12d3-a456-426655440000",
              // "X-GitHub-Event": "push",
              "X-Hub-Signature-256": signatureSha256,
            },
            body: "invalid",
          },
        );

        assert(response.status === 400);
        assert(
          /Required headers missing: x-github-event/.test(
            await response.text(),
          ),
        );

        closeTestServer();
      });

      it("Handles non-request errors", async () => {
        const webhooks = new Webhooks({
          secret: "mySecret",
        });

        webhooks.on("push", () => {
          throw new Error("boom");
        });

        const log = {
          debug: noop,
          info: noop,
          warn: noop,
          error: (error: AggregateError) => {
            assert(error instanceof AggregateError);
            assert(error.errors.length === 1);
            assert(error.errors[0] instanceof Error);
            assert(error.errors[0].message === "boom");
          },
        };

        const { port, closeTestServer } = await instantiateTestServer(
          runtime,
          target,
          webhooks,
          { log },
        );

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

        assert(response.status === 500);
        assert((await response.text()) === '{"error":"Error: boom"}');

        closeTestServer();
      });

      it("Handles empty errors", async () => {
        const webhooks = new Webhooks({
          secret: "mySecret",
        });

        webhooks.on("push", () => {
          throw new Error();
        });

        const log = {
          debug: noop,
          info: noop,
          warn: noop,
          error: (error: AggregateError) => {
            assert(error instanceof AggregateError);
            assert(error.errors.length === 1);
            assert(error.errors[0] instanceof Error);
            assert(error.errors[0].message === "");
          },
        };

        const { port, closeTestServer } = await instantiateTestServer(
          runtime,
          target,
          webhooks,
          { log },
        );

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

        assert(response.status === 500);
        assert(
          (await response.text()) ===
            '{"error":"Error: An Unspecified error occurred"}',
        );

        closeTestServer();
      });

      it("Handles timeout", async () => {
        const webhooks = new Webhooks({
          secret: "mySecret",
        });

        webhooks.on("push", async () => {
          await new Promise((resolve) => {
            setTimeout(resolve, 1000);
          });
          closeTestServer();
        });

        const { port, closeTestServer } = await instantiateTestServer(
          runtime,
          target,
          webhooks,
          { timeout: 500 },
        );

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

        assert(response.status === 202);
        assert((await response.text()) === "still processing\n");
      });

      it("Handles timeout with error", async () => {
        const webhooks = new Webhooks({
          secret: "mySecret",
        });

        webhooks.on("push", async () => {
          await new Promise((resolve) => {
            setTimeout(resolve, 1000);
          });
          closeTestServer();
          throw new Error("oops");
        });

        const { port, closeTestServer } = await instantiateTestServer(
          runtime,
          target,
          webhooks,
          { timeout: 500 },
        );

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

        assert(response.status === 202);
        assert((await response.text()) === "still processing\n");
      });

      it("Handles invalid URL", async () => {
        const webhooks = new Webhooks({
          secret: "mySecret",
        });

        let middlewareWasRan: () => void;
        const untilMiddlewareIsRan = new Promise<void>(function (resolve) {
          middlewareWasRan = resolve;
        });
        const actualMiddleware = createNodeMiddleware(webhooks);
        const mockedMiddleware = async function (
          ...[req, ...rest]: Parameters<typeof actualMiddleware>
        ) {
          req.url = "//";
          await actualMiddleware(req, ...rest);
          middlewareWasRan();
        };

        const server = createServer(mockedMiddleware).listen(
          await findFreePort(),
        );

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

        await untilMiddlewareIsRan;

        assert(response.status === 422);
        assert(
          (await response.text()) ===
            '{"error":"Request URL could not be parsed: //"}',
        );

        server.close();
      });

      it("Handles invalid signature", async () => {
        const webhooks = new Webhooks({
          secret: "mySecret",
        });

        webhooks.onError((error) => {
          assert(error instanceof Error);
          assert(
            error.message ===
              "[@octokit/webhooks] signature does not match event payload and secret",
          );
        });

        const log = {
          debug: noop,
          info: noop,
          warn: noop,
          error: noop,
        };

        const { port, closeTestServer } = await instantiateTestServer(
          runtime,
          target,
          webhooks,
          { log },
        );

        const response = await fetch(
          `http://localhost:${port}/api/github/webhooks`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-GitHub-Delivery": "1",
              "X-GitHub-Event": "push",
              "X-Hub-Signature-256": "",
            },
            body: pushEventPayload,
          },
        );

        assert(response.status === 400);
        assert(
          (await response.text()) ===
            '{"error":"Error: [@octokit/webhooks] signature does not match event payload and secret"}',
        );

        closeTestServer();
      });

      it("Additional secrets", async () => {
        const signatureSha256AdditionalSecret = await sign(
          "additionalSecret2",
          pushEventPayload,
        );

        const webhooks = new Webhooks({
          secret: "mySecret",
          additionalSecrets: ["additionalSecret1", "additionalSecret2"],
        });

        webhooks.on("push", (event) => {
          assert(event.id === "123e4567-e89b-12d3-a456-426655440000");
        });

        const { port, closeTestServer } = await instantiateTestServer(
          runtime,
          target,
          webhooks,
        );

        const response = await fetch(
          `http://localhost:${port}/api/github/webhooks`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-GitHub-Delivery": "123e4567-e89b-12d3-a456-426655440000",
              "X-GitHub-Event": "push",
              "X-Hub-Signature-256": signatureSha256AdditionalSecret,
            },
            body: pushEventPayload,
          },
        );

        assert(response.status === 200);
        assert((await response.text()) === "ok\n");

        closeTestServer();
      });
    });
  });
});
