import { receiverOn } from "../../src/event-handler/on";
import { State } from "../../src/types";

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
