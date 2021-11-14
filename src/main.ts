import { DateTime } from "luxon";
import config from "@/config.json";
import { provider as loggerProvider } from "@/entities/googleAppsScript/adapters/logger/Provider";
import { setIsGoogleAppsScriptEnvironment } from "@/entities/googleAppsScript/adapters/Provider";
import { newDeviceRecorder } from "@/usecases/DeviceRecorder";

export const run = async (): Promise<void> => {
  setIsGoogleAppsScriptEnvironment(true);
  const logger = loggerProvider.provide();
  try {
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
