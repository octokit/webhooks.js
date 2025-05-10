import { describe, it, assert } from "../testrunner.ts";
import { createEventHandler } from "../../src/event-handler/index.ts";
import type {
  EmitterWebhookEvent,
  WebhookEventHandlerError,
} from "../../src/types.ts";
import {
  installationCreatedPayload,
  pushEventPayload,
} from "../fixtures/index.ts";
import { assertError } from "../helpers/assert-error.ts";

it("ensure correct order of events", async () => {
  const eventHandler = createEventHandler({});

  const hooksCalled: string[] = [];
  function hook1() {
    return Promise.resolve().then(() => {
      hooksCalled.push("hook1");
    });
  }
  function hook2() {
    hooksCalled.push("hook2");
  }
  function hook3() {
    hooksCalled.push("hook3");
  }
  function hook4() {
    hooksCalled.push("hook4");
  }
  function hook5() {
    hooksCalled.push("installation");
  }
  function hook6() {
    hooksCalled.push("installation.created");
  }
  function hook7(event: EmitterWebhookEvent) {
    hooksCalled.push(`* (${event.name})`);
  }

  eventHandler.on("push", hook1);
  eventHandler.on("push", hook2);
  eventHandler.on("push", hook3);
  eventHandler.on(["push"], hook4);
  eventHandler.on("installation", hook5);
  eventHandler.on("installation.created", hook6);
  eventHandler.onAny(hook7);

  eventHandler.removeListener("push", hook3);
  eventHandler.removeListener(["push"], hook4);
  // @ts-expect-error TS2345:
  //  Argument of type '"unknown"' is not assignable to parameter of type ...
  eventHandler.removeListener("unknown", () => {});

  await eventHandler.receive({
    id: "123",
    name: "push",
    payload: pushEventPayload,
  });

  await eventHandler.receive({
    id: "456",
    name: "installation",
    payload: installationCreatedPayload,
  });

  assert(hooksCalled.length === 6);
  assert(hooksCalled[0] === "hook2");
  assert(hooksCalled[1] === "* (push)");
  assert(hooksCalled[2] === "hook1");
  assert(hooksCalled[3] === "installation.created");
  assert(hooksCalled[4] === "installation");
  assert(hooksCalled[5] === "* (installation)");
});

describe("when a handler throws an error", () => {
  it("throws an aggregated error", async () => {
    const eventHandler = createEventHandler({});

    eventHandler.on("push", () => {
      throw new Error("oops");
    });

    try {
      await eventHandler.receive({
        id: "123",
        name: "push",
        payload: pushEventPayload,
      });
      assert(false);
    } catch (error: any) {
      assert(error.message === "oops");

      const errors = Array.from(error.errors);
      assert(errors.length === 1);
      assert(
        (Array.from(error.errors) as { message: string }[])[0].message ===
          "oops",
      );
      assert(error instanceof Error);
    }
  });

  it("calls any registered error handlers", async () => {
    const eventHandler = createEventHandler({});
    let done = false;

    eventHandler.on("push", () => {
      throw new Error("oops");
    });

    await new Promise<void>(async (resolve) => {
      eventHandler.onError((error: WebhookEventHandlerError) => {
        assert(error.event.payload);
        assert(error.event.name === "push");
        assert(error.event.id === "123");
        assert(error.message === "oops");
        done = true;

        resolve();
      });

      try {
        await eventHandler.receive({
          id: "123",
          name: "push",
          payload: pushEventPayload,
        });
      } catch {
        // ignore any errors
      }
    });

    assert(done);
  });
});

it("options.transform", async () => {
  let assertsCounted = 0;

  const eventHandler = createEventHandler({
    transform: (event) => {
      assert(event.id === "123");
      assertsCounted++;
      return "funky";
    },
  });

  eventHandler.on("push", (event: EmitterWebhookEvent) => {
    assert((event as unknown as string) === "funky");
    assertsCounted++;
  });

  await eventHandler.receive({
    id: "123",
    name: "push",
    payload: pushEventPayload,
  });
  assert(assertsCounted === 2);
});

it("async options.transform", async () => {
  let done = false;
  const eventHandler = createEventHandler({
    transform: () => {
      return Promise.resolve("funky");
    },
  });

  eventHandler.on("push", (event: EmitterWebhookEvent) => {
    assert((event as unknown as string) === "funky");
    done = true;
  });

  await eventHandler.receive({
    id: "123",
    name: "push",
    payload: pushEventPayload,
  });

  assert(done);
});

it("multiple errors in same event handler", async () => {
  const eventHandler = createEventHandler({});

  eventHandler.on("push", () => {
    throw new Error("oops");
  });

  eventHandler.on("push", () => {
    throw new Error("oops");
  });

  try {
    await eventHandler.receive({
      id: "123",
      name: "push",
      payload: pushEventPayload,
    });
    assert(false);
  } catch (error: any) {
    assertError<AggregateError>(error, AggregateError);
    assert(error.message === "oops\noops");
    assert(error.errors.length === 2);
  }
});
