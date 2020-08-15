import http from "http";

import FakeTimers from "@sinonjs/fake-timers";

import axios from "axios";
import getPort from "get-port";
import { promisify } from "util";
import simple from "simple-mock";
import Tap from "tap";
import { Webhooks } from "../../pkg";
import pushEventPayload from "../fixtures/push-payload.json";

const test = Tap.test;
const beforeEach = Tap.beforeEach;

beforeEach(() => {
  return getPort().then((port) => {
    this.port = port;
  });
});

test("initialised without options", (t) => {
  try {
    new Webhooks();
    t.fail("should throw error");
  } catch (error) {
    t.pass('throws errer if no "secret" option passed');
  }
  t.end();
});

test("GET /", (t) => {
  const api = new Webhooks({
    secret: "mysecret",
  });
  const server = http.createServer(api.middleware);

  promisify(server.listen.bind(server))(this.port)

    .then(() => {
      return axios.get(`http://localhost:${this.port}`);
    })

    .then(() => {
      t.fail("should return a 404");
    })

    .catch((error) => {
      t.is(error.response.status, 404);
    })

    .then(() => {
      server.close(t.end);
    })

    .catch(t.error);
});

test("POST / with push event payload", (t) => {
  t.plan(2);

  const api = new Webhooks({
    secret: "mysecret",
  });
  const server = http.createServer(api.middleware);

  api.on("push", (event) => {
    t.is(event.id, "123e4567-e89b-12d3-a456-426655440000");
  });

  promisify(server.listen.bind(server))(this.port)

    .then(() => {
      return axios.post(`http://localhost:${this.port}`, pushEventPayload, {
        headers: {
          "X-GitHub-Delivery": "123e4567-e89b-12d3-a456-426655440000",
          "X-GitHub-Event": "push",
          "X-Hub-Signature": "sha1=f4d795e69b5d03c139cc6ea991ad3e5762d13e2f",
        },
      });
    })

    .catch(t.error)

    .then((result) => {
      t.is(result.status, 200);
    })

    .then(() => {
      server.close();
    })

    .catch(t.error);
});

//TEST
test("POST / with push event payload (request.body already parsed)", (t) => {
  t.plan(2);

  const api = new Webhooks({
    secret: "mysecret",
  });
  const dataChunks = [];
  let timeout;
  const server = http.createServer((req, res) => {
    req.once("data", (chunk) => dataChunks.push(chunk));
    req.once("end", () => {
      req.body = JSON.parse(Buffer.concat(dataChunks).toString());
      api.middleware(req, res);

      timeout = setTimeout(() => {
        res.statusCode = 500;
        res.end("Middleware timeout");
      }, 3000);
    });
  });

  api.on("push", (event) => {
    t.is(event.id, "123e4567-e89b-12d3-a456-426655440000");
  });

  promisify(server.listen.bind(server))(this.port)

    .then(() => {
      return axios.post(`http://localhost:${this.port}`, pushEventPayload, {
        headers: {
          "X-GitHub-Delivery": "123e4567-e89b-12d3-a456-426655440000",
          "X-GitHub-Event": "push",
          "X-Hub-Signature": "sha1=f4d795e69b5d03c139cc6ea991ad3e5762d13e2f",
        },
      });
    })

    .catch(t.error)

    .then((result) => {
      t.is(result.status, 200);
    })

    .then(() => {
      server.close();
      clearTimeout(timeout);
    })

    .catch(t.error);
});

test("POST / with push event payload (no signature)", (t) => {
  const api = new Webhooks({
    secret: "mysecret",
  });
  const server = http.createServer(api.middleware);
  const errorHandler = simple.spy();
  api.on("error", errorHandler);

  promisify(server.listen.bind(server))(this.port)

    .then(() => {
      return axios.post(`http://localhost:${this.port}`, pushEventPayload, {
        headers: {
          "X-GitHub-Delivery": "123e4567-e89b-12d3-a456-426655440000",
          "X-GitHub-Event": "push",
        },
      });
    })

    .then(() => {
      t.fail("should return a 400");
    })

    .catch((error) => {
      t.is(error.response.status, 400);
    })

    .then(() => {
      t.is(errorHandler.callCount, 1, 'calls "error" event handler');
      server.close(t.end);
    })

    .catch(t.error);
});

test("POST / with push event payload (invalid signature)", (t) => {
  const api = new Webhooks({
    secret: "mysecret",
  });
  const server = http.createServer(api.middleware);
  const errorHandler = simple.spy();
  api.on("error", errorHandler);

  promisify(server.listen.bind(server))(this.port)

    .then(() => {
      return axios.post(`http://localhost:${this.port}`, pushEventPayload, {
        headers: {
          "X-GitHub-Delivery": "123e4567-e89b-12d3-a456-426655440000",
          "X-GitHub-Event": "push",
          "X-Hub-Signature": "sha1=foo",
        },
      });
    })

    .then(() => {
      t.fail("should return a 400");
    })

    .catch((error) => {
      t.is(error.response.status, 400);
    })

    .then(() => {
      t.is(errorHandler.callCount, 1, 'calls "error" event handler');
      server.close(t.end);
    })

    .catch(t.error);
});

test("POST / with hook error", (t) => {
  const api = new Webhooks({
    secret: "mysecret",
  });
  const server = http.createServer(api.middleware);

  api.on("push", () => {
    throw new Error("Oops");
  });

  promisify(server.listen.bind(server))(this.port)

    .then(() => {
      return axios.post(`http://localhost:${this.port}`, pushEventPayload, {
        headers: {
          "X-GitHub-Delivery": "123e4567-e89b-12d3-a456-426655440000",
          "X-GitHub-Event": "push",
          "X-Hub-Signature": "sha1=f4d795e69b5d03c139cc6ea991ad3e5762d13e2f",
        },
      });
    })

    .then(() => {
      t.fail("should return a 500");
    })

    .catch((error) => {
      t.is(error.response.status, 500);
    })

    .then(() => {
      server.close(t.end);
    })

    .catch(t.error);
});

test("POST / with timeout", async (t) => {
  t.plan(1);

  const clock = FakeTimers.install({
    toFake: ["setTimeout"],
  });

  const api = new Webhooks({
    secret: "mysecret",
  });
  const server = http.createServer(api.middleware);
  const tenSecondsInMs = 10 * 1000;

  api.on("push", async (event) => {
    await new Promise((resolve) => setTimeout(resolve, tenSecondsInMs));
  });

  promisify(server.listen.bind(server))(this.port)

    .then(() => {
      return axios.post(`http://localhost:${this.port}`, pushEventPayload, {
        headers: {
          "X-GitHub-Delivery": "123e4567-e89b-12d3-a456-426655440000",
          "X-GitHub-Event": "push",
          "X-Hub-Signature": "sha1=f4d795e69b5d03c139cc6ea991ad3e5762d13e2f",
        },
      });
    })

    .catch(t.error)

    .then((result) => {
      t.is(result.status, 202);
    })

    .then(() => {
      server.close();
      clock.uninstall();
    })

    .catch(t.error);

  await clock.nextAsync();
  await clock.nextAsync();
  await clock.nextAsync();
  await clock.nextAsync();
});
