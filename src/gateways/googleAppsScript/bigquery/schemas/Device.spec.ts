import { DateTime } from "luxon";
import { Movement } from "@/entities/natureRemo/Movement";
import { convertToIsMoved, convertDeviceToInsertId } from "@/gateways/googleAppsScript/bigquery/schemas/Device";

describe(convertDeviceToInsertId.name, () => {
  it("should create insertId by using deviceId and datetime", () => {
    const device = {
      deviceId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      datetime: DateTime.fromISO("2021-09-17T10:11:12Z"),
      temperature: 0,
      humidity: 0,
      illumination: 0,
      movement: Movement.Moved,
    }

    const actual = convertDeviceToInsertId(device);

    const expected = "3fa85f64-5717-4562-b3fc-2c963f66afa6 202109171011"
    expect(actual).toBe(expected);
  });

  it("should convert datetime to UTC", () => {
    const device = {
      deviceId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      datetime: DateTime.fromISO("2021-09-17T10:11:12+09:00"),
      temperature: 0,
      humidity: 0,
      illumination: 0,
      movement: Movement.Moved,
    }

    const actual = convertDeviceToInsertId(device);

    const expected = "3fa85f64-5717-4562-b3fc-2c963f66afa6 202109170111"
    expect(actual).toBe(expected);
  });
});

describe(convertToIsMoved.name, () => {
  it("should return true when movement is Moved", () => {
    const actual = convertToIsMoved(Movement.Moved);

    const expected = true;
    expect(actual).toBe(expected);
  });

  it("should return false when movement is Unmoved", () => {
    const actual = convertToIsMoved(Movement.Unmoved);

    const expected = false;
    expect(actual).toBe(expected);
  });
});
