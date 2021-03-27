import { IncomingMessage, ServerResponse } from "http";

export type MiddlewareOptions = {
  path?: string;
  onUnhandledRequest?: (
    request: IncomingMessage,
    response: ServerResponse
  ) => void;
};
