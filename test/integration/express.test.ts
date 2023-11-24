import { readFileSync } from "node:fs";

import { sign } from "@octokit/webhooks-methods";

// import without types
const express = require("express");

import { createNodeMiddleware, Webhooks } from "../../src/index.ts";

const pushEventPayload = readFileSync(
  "test/fixtures/push-payload.json",
  "utf-8",
);
let signatureSha256: string;

describe("createNodeMiddleware(webhooks) express", () => {
  beforeAll(async () => {
    signatureSha256 = await sign(
      { secret: "mySecret", algorithm: "sha256" },
      pushEventPayload,
    );
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test("express middleware no mount path 404", async () => {
    const app = express();
    const webhooks = new Webhooks({
      secret: "mySecret",
    });

    app.use(createNodeMiddleware(webhooks));
    app.all("*", (_request: any, response: any) =>
      response.status(404).send("Dafuq"),
    );

    const server = app.listen();

    const { port } = server.address();

    const response = await fetch(`http://localhost:${port}/test`, {
      method: "POST",
      body: pushEventPayload,
    });

    await expect(response.text()).resolves.toBe("Dafuq");
    expect(response.status).toEqual(404);

    server.close();
  });

  test("express middleware no mount path no next", async () => {
    const app = express();
    const webhooks = new Webhooks({
      secret: "mySecret",
    });

    app.all("/foo", (_request: any, response: any) => response.end("ok\n"));
    app.use(createNodeMiddleware(webhooks));

    const server = app.listen();

    const { port } = server.address();

    const response = await fetch(`http://localhost:${port}/test`, {
      method: "POST",
      body: pushEventPayload,
    });

    await expect(response.text()).resolves.toContain("Cannot POST /test");
    expect(response.status).toEqual(404);

    const responseForFoo = await fetch(`http://localhost:${port}/foo`, {
      method: "POST",
      body: pushEventPayload,
    });

    await expect(responseForFoo.text()).resolves.toContain("ok\n");
    expect(responseForFoo.status).toEqual(200);

    server.close();
  });

  test("express middleware no mount path with options.path", async () => {
    const app = express();
    const webhooks = new Webhooks({
      secret: "mySecret",
    });

    app.use(createNodeMiddleware(webhooks, { path: "/test" }));
    app.all("*", (_request: any, response: any) =>
      response.status(404).send("Dafuq"),
    );

    const server = app.listen();

    const { port } = server.address();

    const response = await fetch(`http://localhost:${port}/test`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-GitHub-Delivery": "123e4567-e89b-12d3-a456-426655440000",
        "X-GitHub-Event": "push",
        "X-Hub-Signature-256": signatureSha256,
      },
      body: pushEventPayload,
    });

    await expect(response.text()).resolves.toBe("ok\n");
    expect(response.status).toEqual(200);

    server.close();
  });

  test("express middleware with mount path with options.path", async () => {
    const app = express();
    const webhooks = new Webhooks({
      secret: "mySecret",
    });

    app.post("/test", createNodeMiddleware(webhooks, { path: "/test" }));
    app.all("*", (_request: any, response: any) =>
      response.status(404).send("Dafuq"),
    );

    const server = app.listen();

    const { port } = server.address();

    const response = await fetch(`http://localhost:${port}/test`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-GitHub-Delivery": "123e4567-e89b-12d3-a456-426655440000",
        "X-GitHub-Event": "push",
        "X-Hub-Signature-256": signatureSha256,
      },
      body: pushEventPayload,
    });

    await expect(response.text()).resolves.toBe("ok\n");
    expect(response.status).toEqual(200);

    server.close();
  });
});
