import { DateTime } from "luxon";
import config from "@/config.json";
import { loggerProvider, provideLogger } from "@/entities/LoggerProvider";
import { newDeviceRecorder } from "@/usecases/DeviceRecorder";

export const run = async (): Promise<void> => {
  try {
    loggerProvider.setLogger(Logger);
    const logger = provideLogger();
    logger.log("start");
    const currentDatetime = DateTime.now();
    logger.log(currentDatetime);
    const deviceRecorder = newDeviceRecorder(config);
    await deviceRecorder.recordDevice(currentDatetime);
    logger.log("finished");
  } catch (e) {
    logger.log(e);
    throw e;
  }
};
