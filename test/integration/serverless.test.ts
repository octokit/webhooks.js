import { createServer, Server } from "node:http";
import { readFileSync } from "node:fs";

import { sign } from "@octokit/webhooks-methods";
import serverless from "serverless-http";

import { createNodeMiddleware, Webhooks } from "../../src/index.ts";

const pushEventPayload = readFileSync(
  "test/fixtures/push-payload.json",
  "utf-8",
);
let signatureSha256: string;

async function request(
  app: Server,
  request: Object,
  context = {},
  options?: serverless.Options,
): Promise<{ [key: string]: any }> {
  if (process.env.INTEGRATION_TEST) {
    throw new Error();
  }

  const handler = serverless(app as serverless.Application, options);

  return await handler(request, context);
}

describe("createNodeMiddleware(webhooks)", () => {
  beforeAll(async () => {
    signatureSha256 = await sign(
      { secret: "mySecret", algorithm: "sha256" },
      pushEventPayload,
    );
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test("README example", async () => {
    expect.assertions(3);

    const webhooks = new Webhooks({
      secret: "mySecret",
    });

    webhooks.on("push", (event) => {
      expect(event.id).toBe("123e4567-e89b-12d3-a456-426655440000");
    });

    const server = createServer(createNodeMiddleware(webhooks)).listen();

    const response = await request(server, {
      path: "/api/github/webhooks",
      httpMethod: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-GitHub-Delivery": "123e4567-e89b-12d3-a456-426655440000",
        "X-GitHub-Event": "push",
        "X-Hub-Signature-256": signatureSha256,
      },
      body: pushEventPayload,
    });

    expect(response.body).toBe("ok\n");
    expect(response.statusCode).toEqual(200);

    server.close();
  });

  test("request.body already parsed (e.g. Lambda)", async () => {
    expect.assertions(3);

    const webhooks = new Webhooks({
      secret: "mySecret",
    });
    const dataChunks: any[] = [];
    const middleware = createNodeMiddleware(webhooks);

    const server = createServer((req, res) => {
      req.once("data", (chunk) => dataChunks.push(chunk));
      req.once("end", () => {
        // @ts-expect-error - TS2339: Property 'body' does not exist on type 'IncomingMessage'.
        req.body = Buffer.concat(dataChunks).toString();
        middleware(req, res);
      });
    }).listen();

    webhooks.on("push", (event) => {
      expect(event.id).toBe("123e4567-e89b-12d3-a456-426655440000");
    });

    const response = await request(server, {
      path: "/api/github/webhooks",
      httpMethod: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-GitHub-Delivery": "123e4567-e89b-12d3-a456-426655440000",
        "X-GitHub-Event": "push",
        "X-Hub-Signature-256": signatureSha256,
      },
      body: pushEventPayload,
    });

    expect(response.statusCode).toEqual(200);
    expect(await response.body).toEqual("ok\n");

    server.close();
  });

  test("Handles invalid Content-Type", async () => {
    const webhooks = new Webhooks({
      secret: "mySecret",
    });

    const server = createServer(createNodeMiddleware(webhooks)).listen();

    const response = await request(server, {
      path: "/api/github/webhooks",
      httpMethod: "POST",
      headers: {
        "Content-Type": "text/plain",
        "X-GitHub-Delivery": "123e4567-e89b-12d3-a456-426655440000",
        "X-GitHub-Event": "push",
        "X-Hub-Signature-256": signatureSha256,
      },
      body: pushEventPayload,
    });

    expect(response.body).toBe(
      '{"error":"Unsupported \\"Content-Type\\" header value. Must be \\"application/json\\""}',
    );
    expect(response.statusCode).toEqual(415);

    server.close();
  });

  test("Handles Missing Content-Type", async () => {
    const webhooks = new Webhooks({
      secret: "mySecret",
    });

    const server = createServer(createNodeMiddleware(webhooks)).listen();

    const response = await request(server, {
      path: `/api/github/webhooks`,
      httpMethod: "POST",
      headers: {
        "X-GitHub-Delivery": "123e4567-e89b-12d3-a456-426655440000",
        "X-GitHub-Event": "push",
        "X-Hub-Signature-256": signatureSha256,
      },
      body: pushEventPayload,
    });

    expect(response.body).toBe(
      '{"error":"Unsupported \\"Content-Type\\" header value. Must be \\"application/json\\""}',
    );
    expect(response.statusCode).toEqual(415);

    server.close();
  });

  test("Handles invalid JSON", async () => {
    const webhooks = new Webhooks({
      secret: "mySecret",
    });

    const server = createServer(createNodeMiddleware(webhooks)).listen();

    const payload = '{"name":"invalid"';

    const response = await request(server, {
      path: `/api/github/webhooks`,
      httpMethod: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-GitHub-Delivery": "123e4567-e89b-12d3-a456-426655440000",
        "X-GitHub-Event": "push",
        "X-Hub-Signature-256": await sign("mySecret", payload),
      },
      body: payload,
    });

    expect(response.statusCode).toEqual(400);

    expect(response.body).toMatch(/SyntaxError: Invalid JSON/);

    server.close();
  });

  test("Handles non POST request", async () => {
    const webhooks = new Webhooks({
      secret: "mySecret",
    });

    const server = createServer(createNodeMiddleware(webhooks)).listen();

    const response = await request(server, {
      path: `/api/github/webhooks`,
      httpMethod: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-GitHub-Delivery": "123e4567-e89b-12d3-a456-426655440000",
        "X-GitHub-Event": "push",
        "X-Hub-Signature-256": signatureSha256,
      },
      body: "invalid",
    });

    expect(response.statusCode).toEqual(404);

    expect(response.body).toMatch(/Unknown route: PUT \/api\/github\/webhooks/);

    server.close();
  });

  test("handle unhandled requests", async () => {
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
    }).listen();

    const response = await request(server, {
      path: "/foo",
      httpMethod: "PUT",
      headers: {
        "X-GitHub-Delivery": "123e4567-e89b-12d3-a456-426655440000",
        "X-GitHub-Event": "push",
        "X-Hub-Signature-256": signatureSha256,
      },
      body: "invalid",
    });

    expect(response.statusCode).toEqual(404);

    expect(response.body).toEqual("nope.");

    server.close();
  });

  test("Handles missing headers", async () => {
    const webhooks = new Webhooks({
      secret: "mySecret",
    });

    const server = createServer(createNodeMiddleware(webhooks)).listen();

    const response = await request(server, {
      path: `/api/github/webhooks`,
      httpMethod: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-GitHub-Delivery": "123e4567-e89b-12d3-a456-426655440000",
        // "X-GitHub-Event": "push",
        "X-Hub-Signature-256": signatureSha256,
      },
      body: "invalid",
    });

    expect(response.statusCode).toEqual(400);

    expect(response.body).toMatch(/Required headers missing: x-github-event/);

    server.close();
  });

  test("Handles non-request errors", async () => {
    const webhooks = new Webhooks({
      secret: "mySecret",
    });

    webhooks.on("push", () => {
      throw new Error("boom");
    });

    const server = createServer(createNodeMiddleware(webhooks)).listen();

    const response = await request(server, {
      path: `/api/github/webhooks`,
      httpMethod: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-GitHub-Delivery": "123e4567-e89b-12d3-a456-426655440000",
        "X-GitHub-Event": "push",
        "X-Hub-Signature-256": signatureSha256,
      },
      body: pushEventPayload,
    });

    expect(response.body).toMatch(/Error: boom/);
    expect(response.statusCode).toEqual(500);

    server.close();
  });

  test("Handles empty errors", async () => {
    const webhooks = new Webhooks({
      secret: "mySecret",
    });

    webhooks.on("push", () => {
      throw new Error();
    });

    const server = createServer(createNodeMiddleware(webhooks)).listen();

    const response = await request(server, {
      path: `/api/github/webhooks`,
      httpMethod: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-GitHub-Delivery": "123e4567-e89b-12d3-a456-426655440000",
        "X-GitHub-Event": "push",
        "X-Hub-Signature-256": signatureSha256,
      },
      body: pushEventPayload,
    });

    expect(response.body).toMatch(/Error: An Unspecified error occurred/);
    expect(response.statusCode).toEqual(500);

    server.close();
  });

  test("Handles timeout", async () => {
    jest.useFakeTimers();

    const webhooks = new Webhooks({
      secret: "mySecret",
    });

    webhooks.on("push", async () => {
      jest.advanceTimersByTime(10000);
      server.close();
    });

    const server = createServer(createNodeMiddleware(webhooks)).listen();

    const response = await request(server, {
      path: `/api/github/webhooks`,
      httpMethod: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-GitHub-Delivery": "123e4567-e89b-12d3-a456-426655440000",
        "X-GitHub-Event": "push",
        "X-Hub-Signature-256": signatureSha256,
      },
      body: pushEventPayload,
    });

    expect(response.body).toMatch(/still processing/);
    expect(response.statusCode).toEqual(202);
  });

  test("Handles timeout with error", async () => {
    jest.useFakeTimers();

    const webhooks = new Webhooks({
      secret: "mySecret",
    });

    webhooks.on("push", async () => {
      jest.advanceTimersByTime(10000);
      server.close();
      throw new Error("oops");
    });

    const server = createServer(createNodeMiddleware(webhooks)).listen();

    const response = await request(server, {
      path: `/api/github/webhooks`,
      httpMethod: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-GitHub-Delivery": "123e4567-e89b-12d3-a456-426655440000",
        "X-GitHub-Event": "push",
        "X-Hub-Signature-256": signatureSha256,
      },
      body: pushEventPayload,
    });

    expect(response.body).toMatch(/still processing/);
    expect(response.statusCode).toEqual(202);
  });

  test("Handles invalid URL", async () => {
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
    const server = createServer(mockedMiddleware).listen();

    const response = await request(server, {
      path: `/api/github/webhooks`,
      httpMethod: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-GitHub-Delivery": "123e4567-e89b-12d3-a456-426655440000",
        "X-GitHub-Event": "push",
        "X-Hub-Signature-256": signatureSha256,
      },
      body: pushEventPayload,
    });

    await untilMiddlewareIsRan;
    expect(response.statusCode).toEqual(422);
    expect(await response.body).toMatch(/Request URL could not be parsed/);

    server.close();
  });

  test("Handles invalid signature", async () => {
    expect.assertions(3);

    const webhooks = new Webhooks({
      secret: "mySecret",
    });

    webhooks.onError((error) => {
      expect(error.message).toContain(
        "signature does not match event payload and secret",
      );
    });

    const log = {
      debug: jest.fn(),
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    };
    const middleware = createNodeMiddleware(webhooks, { log });
    const server = createServer(middleware).listen();

    const response = await request(server, {
      path: `/api/github/webhooks`,
      httpMethod: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-GitHub-Delivery": "1",
        "X-GitHub-Event": "push",
        "X-Hub-Signature-256": "",
      },
      body: pushEventPayload,
    });

    expect(response.statusCode).toEqual(400);
    expect(response.body).toBe(
      '{"error":"Error: [@octokit/webhooks] signature does not match event payload and secret"}',
    );

    server.close();
  });
});
