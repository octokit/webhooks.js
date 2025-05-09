import type { Logger } from "../createLogger.ts";

export type MiddlewareOptions = {
  timeout?: number;
  path?: string;
  log?: Logger;
};
