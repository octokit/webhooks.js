import { createServer } from "node:http";
import {
  createNodeMiddleware,
  createWebMiddleware,
  Webhooks,
} from "../../src/index.ts";
import getPort from "get-port";
import type { MiddlewareOptions } from "../../src/middleware/types.ts";

type TestServer = {
  closeTestServer: Function;
  port: number;
};

export async function instantiateTestServer(
  runtime: "Node" | "Deno" | "Bun",
  target: "Node" | "Web",
  webhooks: Webhooks,
  options?: MiddlewareOptions,
): Promise<TestServer> {
  const port = await getPort();
  if (
    runtime === "Node" ||
    (runtime === "Deno" && target === "Node") ||
    (runtime === "Bun" && target === "Node")
  ) {
    const server = createServer(createNodeMiddleware(webhooks, options)).listen(
      port,
    );

    return {
      closeTestServer: server.close.bind(server),
      port,
    };
  } else if (runtime === "Bun" && target === "Web") {
    const server = Bun.serve({
      port,
      fetch: createWebMiddleware(webhooks, options),
    });

    return {
      closeTestServer: server.stop.bind(server),
      port,
    };
  } else {
    const ac = new AbortController();
    Deno.serve(
      {
        signal: ac.signal,
        port,
      },
      createWebMiddleware(webhooks, options),
    );

    return {
      closeTestServer: ac.abort.bind(ac),
      port,
    };
  }
}
