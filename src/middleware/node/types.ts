import { IncomingMessage, ServerResponse } from "http";

import { Logger } from "../../createLogger";

export type MiddlewareOptions = {
  path?: string;
  log?: Logger;
  onUnhandledRequest?: (
    request: IncomingMessage,
    response: ServerResponse
  ) => void;
};
