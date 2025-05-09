export interface Logger {
  debug: (...data: any[]) => void;
  info: (...data: any[]) => void;
  warn: (...data: any[]) => void;
  error: (...data: any[]) => void;
}

export const createLogger = (logger?: Partial<Logger>): Logger => ({
  debug: () => {},
  info: () => {},
  warn: console.warn.bind(console),
  error: console.error.bind(console),
  ...logger,
});
