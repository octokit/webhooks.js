import { IncomingMessage, ServerResponse } from "http";
import { middleware } from "../../src/middleware/middleware";
import { State } from "../../src/types";

const state: State = {
  hooks: {},
};

test("next() callback", () => {
  const next = jest.fn();

  middleware(
    state,
    { method: "POST", url: "/foo" } as IncomingMessage,
    {} as ServerResponse,
    next
  );

  expect(next).toHaveBeenCalled();
});
