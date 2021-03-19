export interface Logger {
  debug: (message: string) => unknown;
  info: (message: string) => unknown;
  warn: (message: string) => unknown;
  error: (message: string) => unknown;
}

export const createLogger = (logger?: Partial<Logger>): Logger => ({
  debug: () => {},
  info: () => {},
  warn: console.warn.bind(console),
  error: console.error.bind(console),
  ...logger,
});
