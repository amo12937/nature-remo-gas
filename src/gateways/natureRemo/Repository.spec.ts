import { DateTime } from "luxon";
import { Config } from "@/entities/natureRemo/Config";
import { Device } from "@/entities/natureRemo/Device";
import { Fetcher } from "@/gateways/natureRemo/Fetcher";
import { Repository } from "@/gateways/natureRemo/Repository";

describe(Repository.name, () => {
  describe("getDevices", () => {
    it("should return the empty list when natureRemo return the empty list", () => {
      const config: Config = {
        accessToken: "dummy",
        baseUrl: "dummy",
      };
      const fetcher: Fetcher = {
        fetch: jest.fn().mockReturnValueOnce({
          getContentText: jest.fn().mockReturnValueOnce("[]"),
        }),
      };
      const target = new Repository(config, fetcher);

      const currentDatetime = DateTime.now();
      const actual = target.getDevices(currentDatetime);

      const expected: Device[] = [];
      expect(actual).toEqual(expected);
    });
  });
});
