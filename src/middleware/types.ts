import type { Logger } from "../create-logger.ts";

export type MiddlewareOptions = {
  path?: string;
  log?: Logger;
};
