import { Movement } from "@/entities/natureRemo/Movement";
import { isMovedAtTheLastOneMinute } from "@/gateways/natureRemo/Device";

describe(isMovedAtTheLastOneMinute.name, () => {
  it("should return Moved when the lastMovedAt is within 1 minute before the currentDatetime", () => {
    const currentDatetime = new Date(2021, 8, 12, 10, 10, 0);
    const lastMovedAt = new Date(2021, 8, 12, 10, 9, 0);

    const actual = isMovedAtTheLastOneMinute(currentDatetime, lastMovedAt);

    const expected = Movement.Moved;
    expect(actual).toBe(expected);
  });

  it("should return Unmoved when the lastMovedAt is less than 1 minute before the currentDatetime", () => {
    const currentDatetime = new Date(2021, 8, 12, 10, 10, 0);
    const lastMovedAt = new Date(2021, 8, 12, 10, 8, 59);

    const actual = isMovedAtTheLastOneMinute(currentDatetime, lastMovedAt);

    const expected = Movement.Unmoved;
    expect(actual).toBe(expected);
  });
});
