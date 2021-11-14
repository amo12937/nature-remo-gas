import { retry, AsyncRetry } from "@/entities/retry/asyncRetry";

describe(retry.name, () => {
  it("return same value as what targetFunction returns", async () => {
    const actual = await retry(
      async (_, count) => {
        if (count < 2) {
          throw new Error(new Number(count).toString());
        }
        return 1;
      },
      {
        retries: 5,
        initialMilliseconds: 100,
      }
    );

    const expected = 1;
    expect(actual).toBe(expected);
  });

  it("should stop immediately when bail is called", async () => {
    const error = new Error("stop immediately");

    const actual = retry(async (bail, count) => {
      if (count > 0) {
        throw new Error("executed over twice");
      }
      bail(error);
      return 1;
    });

    const expected = error;
    await expect(actual).rejects.toThrowError(expected);
  });

  it("should throw last error when it's retried <retries> times", async () => {
    const actual = retry(
      async (_, count) => {
        throw new Error(new Number(count).toString());
      },
      {
        retries: 2,
        initialMilliseconds: 100,
      }
    );

    const expected = new Error("2");

    await expect(actual).rejects.toThrowError(expected);
  });
});

describe(AsyncRetry.name, () => {
  describe("convertError", () => {
    it("should return error itself when Error is supplied", () => {
      const error = Error("error");
      const target = new AsyncRetry(async (): Promise<void> => {
        // do nothing.
      });

      const actual = target.convertError(error);

      const expected = error;
      expect(actual).toBe(expected);
    });

    it("should return error with message when string is supplied", () => {
      const message = "error message";
      const target = new AsyncRetry(async (): Promise<void> => {
        // do nothing.
      });

      const actual = target.convertError(message);

      const expected = new Error(message);
      expect(actual).toEqual(expected);
    });

    it("should return unknown error when the other object is supplied", () => {
      const target = new AsyncRetry(async (): Promise<void> => {
        // do nothing.
      });

      const actual = target.convertError(1);

      const expected = new Error("unknown error is occurred in AsyncRetry");
      expect(actual).toEqual(expected);
    });
  });

  describe("calculateSleepMilliseconds", () => {
    it("should return initialMilliseconds when count is 0", () => {
      const target = new AsyncRetry(async (): Promise<void> => {
        // do nothing.
      });

      const actual = target.calculateSleepMilliseconds(0);

      const expected = 1000;
      expect(actual).toBe(expected);
    });

    it("should multiply factor supplied count times", () => {
      const target = new AsyncRetry(async (): Promise<void> => {
        // do nothing.
      });

      const actual = target.calculateSleepMilliseconds(4);

      const expected = 16000;
      expect(actual).toBe(expected);
    });
  });
});
