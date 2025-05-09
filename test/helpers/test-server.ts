import { createServer } from "node:http";
import {
  createNodeMiddleware,
  createWebMiddleware,
  Webhooks,
} from "../../src/index.ts";
import { findFreePort } from "./find-free-port.ts";
import { MiddlewareOptions } from "../../src/middleware/types.ts";

type TestServer = {
  closeTestServer: Function;
  port: number;
};

export async function instantiateTestServer(
  runtime: "Node" | "Deno",
  target: "Node" | "Web",
  webhooks: Webhooks,
  options?: MiddlewareOptions,
): Promise<TestServer> {
  if (runtime === "Node" && target === "Web") {
    throw new Error("Web target not supported in Node");
  }

  const port = await findFreePort();
  if (runtime === "Node" || (runtime === "Deno" && target === "Node")) {
    const server = createServer(createNodeMiddleware(webhooks, options)).listen(
      port,
    );

    return {
      closeTestServer: server.close.bind(server),
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
