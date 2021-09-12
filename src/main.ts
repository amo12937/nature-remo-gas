import { DateTime } from "luxon";
import config from "@/config.json";
import { newRepository } from "@/gateways/natureRemo/Repository";

export const run = (): void => {
  const currentDatetime = DateTime.now();
  const natureRemoRepository = newRepository(config.natureRemo);
  const devices = natureRemoRepository.getDevices(currentDatetime);
  Logger.log(devices);
};
