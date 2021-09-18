import { DateTime } from "luxon";
import { Config } from "@/entities/natureRemo/Config";
import { Device } from "@/entities/natureRemo/Device";
import { Repository } from "@/gateways/natureRemo/Repository";

describe(Repository.name, () => {
  describe("getDevices", () => {
    it("should return the empty list when natureRemo returns the empty list", () => {
      const config: Config = {
        accessToken: "dummy",
        baseUrl: "dummy",
      };
      const urlFetchApp: GoogleAppsScript.URL_Fetch.UrlFetchApp = {
        fetch: jest.fn().mockReturnValueOnce({
          getContentText: jest.fn().mockReturnValueOnce("[]"),
        }),
        fetchAll: jest.fn(),
        getRequest: jest.fn(),
      };
      const target = new Repository(config, urlFetchApp);

      const currentDatetime = DateTime.now();
      const actual = target.getDevices(currentDatetime);

      const expected: Device[] = [];
      expect(actual).toEqual(expected);
    });

    it("should throw error when natureRemo returns non json value", () => {
      const config: Config = {
        accessToken: "dummy",
        baseUrl: "dummy",
      };
      const urlFetchApp: GoogleAppsScript.URL_Fetch.UrlFetchApp = {
        fetch: jest.fn().mockReturnValueOnce({
          getContentText: jest.fn().mockReturnValueOnce("hoge"),
        }),
        fetchAll: jest.fn(),
        getRequest: jest.fn(),
      };
      const target = new Repository(config, urlFetchApp);

      const currentDatetime = DateTime.now();
      expect((): void => {
        target.getDevices(currentDatetime);
      }).toThrowError();
    });

    it("should return Device list when natureRemo returns device list", () => {
      const config: Config = {
        accessToken: "dummy",
        baseUrl: "dummy",
      };
      const urlFetchApp: GoogleAppsScript.URL_Fetch.UrlFetchApp = {
        fetch: jest.fn().mockReturnValueOnce({
          getContentText: jest.fn().mockReturnValueOnce(
            JSON.stringify([
              {
                id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                name: "string",
                temperature_offset: 0,
                humidity_offset: 0,
                created_at: "2021-09-12T06:44:50.710Z",
                updated_at: "2021-09-12T06:44:50.710Z",
                firmware_version: "string",
                mac_address: "string",
                serial_number: "string",
                newest_events: {
                  te: {
                    val: 0,
                    created_at: "2020-09-10T06:03:58.213Z",
                  },
                  hu: {
                    val: 0,
                    created_at: "2020-09-10T06:03:58.213Z",
                  },
                  il: {
                    val: 0,
                    created_at: "2020-09-10T06:03:58.213Z",
                  },
                  mo: {
                    val: 1,
                    created_at: "2020-09-10T06:03:58.213Z",
                  },
                },
              },
            ])
          ),
        }),
        fetchAll: jest.fn(),
        getRequest: jest.fn(),
      };
      const target = new Repository(config, urlFetchApp);

      const currentDatetime = DateTime.now();
      const actual = target.getDevices(currentDatetime).length;

      const expected = 1;
      expect(actual).toEqual(expected);
    });
  });
});
