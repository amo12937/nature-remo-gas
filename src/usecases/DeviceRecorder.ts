import { DateTime } from "luxon";
import { Config } from "@/entities/Config";
import {
  newRepository as newDeviceTableRepository,
  RepositoryInterface as DeviceTableRepositoryInterface,
} from "@/gateways/googleAppsScript/apis/bigquery/tables/device/Repository";
import {
  newRepository as newNatureRemoRepository,
  RepositoryInterface as NatureRemoRepositoryInterface,
} from "@/gateways/natureRemo/Repository";

export interface DeviceRecorderInterface {
  recordDevice(currentDatetime: DateTime): Promise<void>;
}

export const newDeviceRecorder = (config: Config): DeviceRecorderInterface => {
  const natureRemoRepository = newNatureRemoRepository(config.natureRemo);
  const deviceTableRepository = newDeviceTableRepository(config);
  return new DeviceRecorder(natureRemoRepository, deviceTableRepository);
};

export class DeviceRecorder implements DeviceRecorderInterface {
  natureRemoRepository: NatureRemoRepositoryInterface;
  deviceTableRepository: DeviceTableRepositoryInterface;

  constructor(
    natureRemoRepository: NatureRemoRepositoryInterface,
    deviceTableRepository: DeviceTableRepositoryInterface
  ) {
    this.natureRemoRepository = natureRemoRepository;
    this.deviceTableRepository = deviceTableRepository;
  }

  async recordDevice(currentDatetime: DateTime): Promise<void> {
    const devices = this.natureRemoRepository.getDevices(currentDatetime);
    await this.deviceTableRepository.insertAll(devices);
  }
}
