import { DateTime } from "luxon";
import { convertToTableId } from "@/gateways/googleAppsScript/apis/bigquery/tables/device/Table";
import { Movement } from "@/entities/natureRemo/Movement";

describe(convertToTableId.name, () => {
  it("should return tableId", () => {
    const config = {
      projectId: "project_id",
      datasetId: "dataset_id",
      timezone: "Asia/Tokyo",
    };
    const device = {
      deviceId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      datetime: DateTime.fromISO("2021-09-17T10:11:12+09:00"),
      temperature: 0,
      humidity: 0,
      illumination: 0,
      movement: Movement.Moved,
    };

    const actual = convertToTableId(config, device);

    const expected = "device_3fa85f64-5717-4562-b3fc-2c963f66afa6_20210917";
    expect(actual).toBe(expected);
  });
});
