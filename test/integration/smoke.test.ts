import { it, assert } from "../testrunner.ts";
import {
  Webhooks,
  createEventHandler,
  emitterEventNames,
} from "../../src/index.ts";

const defaultEmitWarning = process.emitWarning;

it("check exports of @octokit/webhooks", () => {
  let warned = false;
  process.emitWarning = () => {
    warned = true;
  };

  const api = new Webhooks({
    secret: "mysecret",
  });

  assert(typeof api === "object");
  assert(typeof api.sign === "function");
  assert(typeof api.verify === "function");
  assert(typeof api.on === "function");
  assert(typeof api.removeListener === "function");
  assert(typeof api.receive === "function");
  assert(typeof api.verifyAndReceive === "function");
  assert(typeof api.onAny === "function");
  assert(warned === false);

  process.emitWarning = defaultEmitWarning;
});

it('require("@octokit/webhooks").createEventHandler', () => {
  let warned = false;

  process.emitWarning = () => {
    warned = true;
  };

  try {
    createEventHandler({});
  } catch (error) {
    assert(false);
  }
  assert(warned === false);

  process.emitWarning = defaultEmitWarning;
});

it('require("@octokit/webhooks").emitterEventNames', () => {
  const allEvents = emitterEventNames;

  assert(Array.isArray(allEvents));

  assert(allEvents.length > 0);
  for (let i = 0; i < allEvents.length; i++) {
    assert(typeof allEvents[i] === "string");
  }
});
