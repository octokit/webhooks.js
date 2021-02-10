import { receiverOn } from "../../src/event-handler/on";
import { EmitterWebhookEventName, State } from "../../src/types";

function noop() {}

const state: State = {
  hooks: {},
};

beforeEach(() => jest.resetAllMocks());

// Test broken with TypeScript without the ignore
test("receiver.on with invalid event name", () => {
  const consoleWarnSpy = jest.spyOn(console, "warn").mockImplementation(noop);

  // @ts-expect-error
  receiverOn(state, "foo", noop);

  expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
  expect(consoleWarnSpy).toHaveBeenLastCalledWith(
    '"foo" is not a known webhook name (https://developer.github.com/v3/activity/events/types/)'
  );
});

test("receiver.on with event name of '*' throws an error", () => {
  expect(() =>
    receiverOn(state, "*" as EmitterWebhookEventName, noop)
  ).toThrowError(
    'Using the "*" event with the regular Webhooks.on() function is not supported. Please use the Webhooks.onAny() method instead'
  );
});

test("receiver.on with event name of 'error' throws an error", () => {
  expect(() =>
    receiverOn(state, "error" as EmitterWebhookEventName, noop)
  ).toThrowError(
    'Using the "error" event with the regular Webhooks.on() function is not supported. Please use the Webhooks.onError() method instead'
  );
});
