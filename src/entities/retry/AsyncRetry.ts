import { provider as loggerProvider } from "@/entities/googleAppsScript/adapters/logger/Provider";
import { provider as sleeperProvider } from "@/entities/googleAppsScript/adapters/sleeper/Provider";

export type Bail = (e: Error) => void;
export type TargetFunction<T> = (bail: Bail, count: number) => Promise<T>;
export type Result<T> =
  | {
      tag: "successful";
      result: T;
    }
  | {
      tag: "bailed";
      error: Error;
    };

export type RetryOption = {
  retries: number;
  onRetry: (e: Error) => void;
  factor: number;
  initialMilliseconds: number;
};
const defaultOption: RetryOption = {
  retries: 5,
  onRetry: () => {
    // do nothing.
  },
  factor: 2,
  initialMilliseconds: 1000,
};

export const retry = <T>(
  targetFunction: TargetFunction<T>,
  userOption: Partial<RetryOption> = {}
): Promise<T> => new AsyncRetry(targetFunction, userOption).run();

export class AsyncRetry<T> {
  targetFunction: TargetFunction<T>;
  option: RetryOption;
  lastError: Error | null;

  constructor(
    targetFunction: TargetFunction<T>,
    userOption: Partial<RetryOption> = {}
  ) {
    this.targetFunction = targetFunction;
    this.option = {
      ...defaultOption,
      ...userOption,
    };
    this.lastError = null;
  }

  async executeOnce(count: number): Promise<Result<T>> {
    return new Promise((resolve, reject) => {
      const bail = (e: Error): void => {
        resolve({
          tag: "bailed",
          error: e,
        });
      };
      this.targetFunction(bail, count)
        .then((t: T) => {
          resolve({
            tag: "successful",
            result: t,
          });
        })
        .catch(reject);
    });
  }

  async executeUntilResultIsReturned(): Promise<Result<T>> {
    const logger = loggerProvider.provide();
    const sleeper = sleeperProvider.provide();
    for (let i = 0; i <= this.option.retries; i++) {
      try {
        return await this.executeOnce(i);
      } catch (error: unknown) {
        const e = this.convertError(error);
        this.lastError = e;
        logger.log(e);
        if (i < this.option.retries) {
          const milliseconds = this.calculateSleepMilliseconds(i);
          logger.log(`will wait ${milliseconds} ms...`);
          await sleeper.sleep(milliseconds);
        }
      }
    }

    if (this.lastError != null) {
      throw this.lastError;
    }

    throw new Error("it was retried maximum times but nothing error happened.");
  }

  run(): Promise<T> {
    return this.executeUntilResultIsReturned().then((result) => {
      if (result.tag === "bailed") {
        throw result.error;
      }
      return result.result;
    });
  }

  convertError(error: unknown): Error {
    if (error instanceof Error) {
      return error;
    }

    if (typeof error === "string") {
      return new Error(error);
    }

    return new Error("unknown error is occurred in AsyncRetry");
  }

  calculateSleepMilliseconds(count: number): number {
    return this.option.initialMilliseconds * this.option.factor ** count;
  }
}
