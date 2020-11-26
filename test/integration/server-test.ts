import http from "http";

import axios, { AxiosError, AxiosResponse } from "axios";
import getPort from "get-port";
import { promisify } from "util";
import { Webhooks } from "../../src";
import pushEventPayload from "../fixtures/push-payload.json";

const signatureSha1 = "sha1=f4d795e69b5d03c139cc6ea991ad3e5762d13e2f";
const signatureSha256 =
  "sha256=2b49327af77d51c4c23700118b11d15c81d90c3bd57dafbbe32eb50085ce67e0";

describe("server-test", () => {
  let availablePort: number;

  beforeEach(() => {
    jest.useFakeTimers();

    return getPort().then((port) => {
      availablePort = port;
    });
  });

  test("initialised without options", (t) => {
    try {
      new Webhooks();
      t.fail("should throw error");
    } catch (error) {
      t();
    }
  });

  test("GET /", (t) => {
    const api = new Webhooks({
      secret: "mysecret",
    });
    const server = http.createServer(api.middleware);

    const promisifiedServer = <(port: number) => Promise<any>>(
      promisify(server.listen.bind(server))
    );

    promisifiedServer(availablePort)
      .then(() => {
        return axios.get(`http://localhost:${availablePort}`);
      })

      .then(() => {
        t.fail("should return a 404");
      })
      .catch((error: AxiosError) => {
        error.response && expect(error.response.status).toBe(404);
      })
      .finally(() => server.close(t));
  });

  test("POST / with push event payload with wrong sha1 but right sha256", (t) => {
    expect.assertions(2);

    const api = new Webhooks({
      secret: "mysecret",
    });
    const server = http.createServer(api.middleware);

    api.on("push", (event) => {
      expect(event.id).toBe("123e4567-e89b-12d3-a456-426655440000");
    });

    const promisifiedServer = <(port: number) => Promise<any>>(
      promisify(server.listen.bind(server))
    );

    promisifiedServer(availablePort)
      .then(() => {
        return axios.post(
          `http://localhost:${availablePort}`,
          pushEventPayload,
          {
            headers: {
              "X-GitHub-Delivery": "123e4567-e89b-12d3-a456-426655440000",
              "X-GitHub-Event": "push",
              "X-Hub-Signature": "ignored",
              "X-Hub-Signature-256": signatureSha256,
            },
          }
        );
      })

      .then((result: AxiosResponse) => {
        expect(result.status).toBe(200);
      })
      .catch((e) => expect(e instanceof Error).toBeTruthy())
      .finally(() => server.close(t));
  });

  test("POST / with push event payload with only sha1", (t) => {
    expect.assertions(2);

    const api = new Webhooks({
      secret: "mysecret",
    });
    const server = http.createServer(api.middleware);

    api.on("push", (event) => {
      expect(event.id).toBe("123e4567-e89b-12d3-a456-426655440000");
    });

    const promisifiedServer = <(port: number) => Promise<any>>(
      promisify(server.listen.bind(server))
    );

    promisifiedServer(availablePort)
      .then(() => {
        return axios.post(
          `http://localhost:${availablePort}`,
          pushEventPayload,
          {
            headers: {
              "X-GitHub-Delivery": "123e4567-e89b-12d3-a456-426655440000",
              "X-GitHub-Event": "push",
              "X-Hub-Signature": signatureSha1,
            },
          }
        );
      })

      .then((result: AxiosResponse) => {
        expect(result.status).toBe(200);
      })
      .catch((e) => expect(e instanceof Error).toBeTruthy())
      .finally(() => server.close(t));
  });

  test("POST / with push event payload", (t) => {
    expect.assertions(2);

    const api = new Webhooks({
      secret: "mysecret",
    });
    const server = http.createServer(api.middleware);

    api.on("push", (event) => {
      expect(event.id).toBe("123e4567-e89b-12d3-a456-426655440000");
    });

    const promisifiedServer = <(port: number) => Promise<any>>(
      promisify(server.listen.bind(server))
    );

    promisifiedServer(availablePort)
      .then(() => {
        return axios.post(
          `http://localhost:${availablePort}`,
          pushEventPayload,
          {
            headers: {
              "X-GitHub-Delivery": "123e4567-e89b-12d3-a456-426655440000",
              "X-GitHub-Event": "push",
              "X-Hub-Signature": "sha1=foo",
              "X-Hub-Signature-256": signatureSha256,
            },
          }
        );
      })

      .then((result: AxiosResponse) => {
        expect(result.status).toBe(200);
      })
      .catch((e) => expect(e instanceof Error).toBeTruthy())
      .finally(() => server.close(t));
  });

  // TEST
  test("POST / with push event payload (request.body already parsed)", (t) => {
    expect.assertions(2);

    const api = new Webhooks({
      secret: "mysecret",
    });
    const dataChunks: any[] = [];
    let timeout: NodeJS.Timeout;
    const server = http.createServer((req, res) => {
      req.once("data", (chunk) => dataChunks.push(chunk));
      req.once("end", () => {
        // @ts-ignore
        req.body = JSON.parse(Buffer.concat(dataChunks).toString());
        api.middleware(req, res);

        timeout = setTimeout(() => {
          res.statusCode = 500;
          res.end("Middleware timeout");
        }, 3000);
      });
    });

    api.on("push", (event) => {
      expect(event.id).toBe("123e4567-e89b-12d3-a456-426655440000");
    });

    const promisifiedServer = <(port: number) => Promise<any>>(
      promisify(server.listen.bind(server))
    );

    promisifiedServer(availablePort)
      .then(() => {
        return axios.post(
          `http://localhost:${availablePort}`,
          pushEventPayload,
          {
            headers: {
              "X-GitHub-Delivery": "123e4567-e89b-12d3-a456-426655440000",
              "X-GitHub-Event": "push",
              "X-Hub-Signature": signatureSha1,
              "X-Hub-Signature-256": signatureSha256,
            },
          }
        );
      })
      .then((result: AxiosResponse) => {
        expect(result.status).toBe(200);
      })
      .catch((e: Error) => expect(e).toBeInstanceOf(Error))
      .finally(() => {
        clearTimeout(timeout);
        server.close(t);
      });
  });

  test("POST / with push event payload (no signature)", (t) => {
    const api = new Webhooks({
      secret: "mysecret",
    });
    const server = http.createServer(api.middleware);
    const errorHandler = jest.fn();
    api.onError(errorHandler);

    const promisifiedServer = <(port: number) => Promise<any>>(
      promisify(server.listen.bind(server))
    );

    promisifiedServer(availablePort)
      .then(() => {
        return axios.post(
          `http://localhost:${availablePort}`,
          pushEventPayload,
          {
            headers: {
              "X-GitHub-Delivery": "123e4567-e89b-12d3-a456-426655440000",
              "X-GitHub-Event": "push",
            },
          }
        );
      })

      .then(() => {
        t.fail("should return a 400");
      })
      .catch((error: AxiosError) => {
        error.response && expect(error.response.status).toBe(400);
      })
      .finally(() => {
        expect(errorHandler).toHaveBeenCalled(); // calls "error" event handler
        server.close(t);
      });
  });

  test("POST / with push event payload (invalid signature)", (t) => {
    const api = new Webhooks({
      secret: "mysecret",
    });
    const server = http.createServer(api.middleware);
    const errorHandler = jest.fn();
    api.onError(errorHandler);

    const promisifiedServer = <(port: number) => Promise<any>>(
      promisify(server.listen.bind(server))
    );

    promisifiedServer(availablePort)
      .then(() => {
        return axios.post(
          `http://localhost:${availablePort}`,
          pushEventPayload,
          {
            headers: {
              "X-GitHub-Delivery": "123e4567-e89b-12d3-a456-426655440000",
              "X-GitHub-Event": "push",
              "X-Hub-Signature": "sha1=foo",
              "X-Hub-Signature-256": "sha256=foo",
            },
          }
        );
      })

      .then(() => {
        t.fail("should return a 400");
      })
      .catch((error: AxiosError) => {
        error.response && expect(error.response.status).toBe(400);
      })
      .finally(() => {
        expect(errorHandler).toHaveBeenCalled(); // calls "error" event handler
        server.close(t);
      });
  });

  test("POST / with hook error", (t) => {
    const api = new Webhooks({
      secret: "mysecret",
    });
    const server = http.createServer(api.middleware);

    api.on("push", () => {
      throw new Error("Oops");
    });

    const promisifiedServer = <(port: number) => Promise<any>>(
      promisify(server.listen.bind(server))
    );

    promisifiedServer(availablePort)
      .then(() => {
        return axios.post(
          `http://localhost:${availablePort}`,
          pushEventPayload,
          {
            headers: {
              "X-GitHub-Delivery": "123e4567-e89b-12d3-a456-426655440000",
              "X-GitHub-Event": "push",
              "X-Hub-Signature": signatureSha1,
              "X-Hub-Signature-256": signatureSha256,
            },
          }
        );
      })

      .then(() => {
        t.fail("should return a 500");
      })
      .catch((error: AxiosError) => {
        error.response && expect(error.response.status).toBe(500);
      })
      .finally(() => {
        server.close(t);
      });
  });

  test("POST / with timeout", async (t) => {
    expect.assertions(2);

    const api = new Webhooks({
      secret: "mysecret",
    });
    const server = http.createServer(api.middleware);
    const tenSecondsInMs = 10 * 1000;

    api.on("push", async () => {
      await new Promise((resolve) => {
        jest.runAllTimers();
        setTimeout(resolve, tenSecondsInMs);
      });
    });

    const promisifiedServer = <(port: number) => Promise<any>>(
      promisify(server.listen.bind(server))
    );

    promisifiedServer(availablePort)
      .then(() => {
        return axios.post(
          `http://localhost:${availablePort}`,
          pushEventPayload,
          {
            headers: {
              "X-GitHub-Delivery": "123e4567-e89b-12d3-a456-426655440000",
              "X-GitHub-Event": "push",
              "X-Hub-Signature": signatureSha1,
              "X-Hub-Signature-256": signatureSha256,
            },
          }
        );
      })

      .then((result: AxiosResponse) => {
        expect(setTimeout).toHaveBeenCalled();
        expect(result.status).toBe(202);
      })
      .catch((error: AxiosError) => {
        error.response && expect(error.response.status).toBe(400);
      })
      .finally(() => {
        server.close();
        t();
      });
  });

  afterEach(() => jest.clearAllTimers());
});
