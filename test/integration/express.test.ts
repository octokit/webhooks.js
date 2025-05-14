import type { AddressInfo } from "node:net";
import { readFileSync } from "node:fs";
import express from "express";
import { sign } from "@octokit/webhooks-methods";

import getPort from "get-port";
import { describe, it, assert } from "../testrunner.ts";

import { createNodeMiddleware, Webhooks } from "../../src/index.ts";

const pushEventPayload = readFileSync(
  "test/fixtures/push-payload.json",
  "utf-8",
);

const signatureSha256 = await sign("mySecret", pushEventPayload);

describe("createNodeMiddleware(webhooks)", () => {
  it("express middleware no mount path 404", async () => {
    const app = express();
    const webhooks = new Webhooks({
      secret: "mySecret",
    });

    app.use(createNodeMiddleware(webhooks));
    app.all("*wildcard", (_request: any, response: any) =>
      response.status(404).send("Dafuq"),
    );

    const server = app.listen(await getPort());

    const { port } = server.address() as AddressInfo;

    const response = await fetch(`http://localhost:${port}/test`, {
      method: "POST",
      body: pushEventPayload,
    });

    assert(response.status === 404);
    assert((await response.text()) === "Dafuq");

    server.close();
  });
});

describe("createNodeMiddleware(webhooks)", () => {
  it("express middleware no mount path no next", async () => {
    const app = express();
    const webhooks = new Webhooks({
      secret: "mySecret",
    });

    app.all("/foo", (_request: any, response: any) => response.end("ok\n"));
    app.use(createNodeMiddleware(webhooks));

    const server = app.listen(await getPort());

    const { port } = server.address() as AddressInfo;

    const response = await fetch(`http://localhost:${port}/test`, {
      method: "POST",
      body: pushEventPayload,
    });

    assert(response.status === 404);
    assert(/Cannot POST \/test/.test(await response.text()));

    const responseForFoo = await fetch(`http://localhost:${port}/foo`, {
      method: "POST",
      body: pushEventPayload,
    });

    assert(responseForFoo.status === 200);
    assert(/ok\n/.test(await responseForFoo.text()));

    server.close();
  });
});

describe("createNodeMiddleware(webhooks)", () => {
  it("express middleware no mount path with options.path", async () => {
    const app = express();
    const webhooks = new Webhooks({
      secret: "mySecret",
    });

    app.use(createNodeMiddleware(webhooks, { path: "/test" }));
    app.all("*wildcard", (_request: any, response: any) =>
      response.status(404).send("Dafuq"),
    );

    const server = app.listen(await getPort());

    const { port } = server.address() as AddressInfo;

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

    assert(response.status === 200);
    assert((await response.text()) === "ok\n");

    server.close();
  });
});

describe("createNodeMiddleware(webhooks)", () => {
  it("express middleware with mount path with options.path", async () => {
    const app = express();
    const webhooks = new Webhooks({
      secret: "mySecret",
    });

    app.post("/test", createNodeMiddleware(webhooks, { path: "/test" }));
    app.all("*wildcard", (_request: any, response: any) =>
      response.status(404).send("Dafuq"),
    );

    const server = app.listen(await getPort());

    const { port } = server.address() as AddressInfo;

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

    assert(response.status === 200);
    assert((await response.text()) === "ok\n");

    server.close();
  });
});
