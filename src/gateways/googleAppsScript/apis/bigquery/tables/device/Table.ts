import { Config } from "@/entities/googleAppsScript/apis/bigquery/Config";
import {
  Table as TableInterface,
  TableReference,
  TableSchema,
} from "@/entities/googleAppsScript/apis/bigquery/schema/Table";
import { Device } from "@/entities/natureRemo/Device";
import { schema } from "@/gateways/googleAppsScript/apis/bigquery/tables/device/Schema";

export class Table implements TableInterface {
  readonly tableReference: TableReference;
  readonly schema: TableSchema;

  constructor(config: Config, device: Device) {
    this.tableReference = {
      datasetId: config.datasetId,
      projectId: config.projectId,
      tableId: convertToTableId(config, device),
    };
    this.schema = schema;
  }
}

export const convertToTableId = (config: Config, device: Device): string => {
  const suffix = device.datetime.setZone(config.timezone).toFormat("yyyyMMdd");
  return `device_${device.deviceId}_${suffix}`;
};
