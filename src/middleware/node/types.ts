import type { Logger } from "../../createLogger.ts";

export type MiddlewareOptions = {
  path?: string;
  log?: Logger;
};
