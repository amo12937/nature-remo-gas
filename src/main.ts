import { DateTime } from "luxon";
import config from "@/config.json";
import { newDeviceRecorder } from "@/usecases/DeviceRecorder";

export const run = async (): Promise<void> => {
  Logger.log("start");
  const currentDatetime = DateTime.now();
  Logger.log(currentDatetime);
  const deviceRecorder = newDeviceRecorder(config);
  await deviceRecorder.recordDevice(currentDatetime);
  Logger.log("finished");
};
