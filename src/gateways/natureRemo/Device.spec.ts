import { DateTime } from "luxon";
import { Movement } from "@/entities/natureRemo/Movement";
import { isMovedAtTheLastOneMinute } from "@/gateways/natureRemo/Device";

describe(isMovedAtTheLastOneMinute.name, () => {
  it("should return Moved when the lastMovedAt is within 1 minute before the currentDatetime", () => {
    const currentDatetime = DateTime.fromObject({
      year: 2021,
      month: 9,
      day: 12,
      hour: 10,
      minute: 10,
      second: 0,
    });
    const lastMovedAt = DateTime.fromObject({
      year: 2021,
      month: 9,
      day: 12,
      hour: 10,
      minute: 9,
      second: 0,
    });

    const actual = isMovedAtTheLastOneMinute(currentDatetime, lastMovedAt);

    const expected = Movement.Moved;
    expect(actual).toBe(expected);
  });

  it("should return Unmoved when the lastMovedAt is less than 1 minute before the currentDatetime", () => {
    const currentDatetime = DateTime.fromObject({
      year: 2021,
      month: 9,
      day: 12,
      hour: 10,
      minute: 10,
      second: 0,
    });
    const lastMovedAt = DateTime.fromObject({
      year: 2021,
      month: 9,
      day: 12,
      hour: 10,
      minute: 8,
      second: 59,
    });

    const actual = isMovedAtTheLastOneMinute(currentDatetime, lastMovedAt);

    const expected = Movement.Unmoved;
    expect(actual).toBe(expected);
  });
});
