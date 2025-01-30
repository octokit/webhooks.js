import type { Logger } from "../../createLogger.js";
import type { Webhooks } from "../../index.js";

export type MiddlewareOptions = {
  webhooks: Webhooks;
  path?: string;
  log?: Logger;
};
