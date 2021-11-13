export interface LoggerInterface {
  log(s: string): void;
  log(e: Error): void;
}

class LoggerProvider {
  logger: LoggerInterface;

  constructor() {
    this.logger = console;
  }

  setLogger(logger: LoggerInterface) {
    this.logger = logger;
  }

  getLogger() {
    return this.logger;
  }
}

export const loggerProvider = new LoggerProvider();

export const provideLogger = (): LoggerInterface => loggerProvider.getLogger();
