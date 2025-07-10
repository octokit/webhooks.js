export interface Logger {
  debug: (...data: any[]) => void;
  info: (...data: any[]) => void;
  warn: (...data: any[]) => void;
  error: (...data: any[]) => void;
}

export const createLogger = (logger = {} as Partial<Logger>): Logger => {
  if (typeof logger.debug !== "function") {
    logger.debug = () => {};
  }
  if (typeof logger.info !== "function") {
    logger.info = () => {};
  }
  if (typeof logger.warn !== "function") {
    logger.warn = console.warn.bind(console);
  }
  if (typeof logger.error !== "function") {
    logger.error = console.error.bind(console);
  }
  return logger as Logger;
};
