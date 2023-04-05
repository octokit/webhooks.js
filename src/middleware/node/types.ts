// remove type imports from http for Deno compatibility
// see https://github.com/octokit/octokit.js/issues/24#issuecomment-817361886
// import { IncomingMessage, ServerResponse } from "http";
type IncomingMessage = any;
type ServerResponse = any;

import type { Logger } from "../../createLogger";

export type MiddlewareOptions = {
  path?: string | RegExp;
  log?: Logger;
  /** @deprecated `onUnhandledRequest()` is deprecated and will be removed in a future release of `@octokit/webhooks` */
  onUnhandledRequest?: (
    request: IncomingMessage,
    response: ServerResponse
  ) => void;
};
