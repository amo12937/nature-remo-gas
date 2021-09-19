import { DateTime } from "luxon";
import { Movement } from "@/entities/natureRemo/Movement";
import { Repository } from "@/gateways/googleAppsScript/apis/bigquery/tables/device/Repository";

describe(Repository.name, () => {
  describe("insert", () => {
    it("should retry if bigquery api is failed", async () => {
      const bigquery = {
        Jobs: {
          cancel: jest.fn(),
          get: jest.fn(),
          getQueryResults: jest.fn(),
          insert: jest.fn().mockImplementation(() => {
            throw new Error();
          }),
          list: jest.fn(),
          query: jest.fn(),
        },
        Tables: {
          get: jest.fn(),
          insert: jest.fn(),
          list: jest.fn(),
          patch: jest.fn(),
          remove: jest.fn(),
          update: jest.fn(),
        },
      };

      const tableProvider = {
        createTable: () => ({
          tableReference: {
            datasetId: "dataset id",
            projectId: "project id",
            tableId: "table id",
          },
        }),
      };

      const jobProvider = {
        createJob: jest.fn(),
      };

      const target = new Repository(
        {
          core: {
            timezone: "Asia/Tokyo",
          },
          googleAppsScript: {
            apis: {
              bigquery: {
                projectId: "project_id",
                datasetId: "dataset_id",
                retry: {
                  retries: 1,
                },
              },
            },
          },
        },
        bigquery,
        tableProvider,
        jobProvider
      );

      const device = {
        deviceId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        datetime: DateTime.fromISO("2021-09-17T10:11:12Z"),
        temperature: 0,
        humidity: 0,
        illumination: 0,
        movement: Movement.Moved,
      };

      try {
        await target.insert(device);
      } catch {
        // do nothing.
      }

      const actual = bigquery.Jobs.insert.mock.calls.length;

      const expected = 2;
      expect(actual).toBe(expected);
    });
  });
});
