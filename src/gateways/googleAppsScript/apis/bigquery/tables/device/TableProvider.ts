import { Config } from "@/entities/googleAppsScript/apis/bigquery/Config";
import { Table } from "@/entities/googleAppsScript/apis/bigquery/schema/Table";
import { Device } from "@/entities/natureRemo/Device";
import { schema } from "@/gateways/googleAppsScript/apis/bigquery/tables/device/Schema";

export interface TableProviderInterface {
  createTable(device: Device): Table;
}

export class TableProvider implements TableProviderInterface {
  readonly config: Config;

  constructor(config: Config) {
    this.config = config;
  }

  createTable(device: Device): Table {
    return {
      tableReference: {
        datasetId: this.config.datasetId,
        projectId: this.config.projectId,
        tableId: this.convertToTableId(device),
      },
      schema,
    };
  }

  convertToTableId(device: Device): string {
    const suffix = device.datetime
      .setZone(this.config.timezone)
      .toFormat("yyyyMMdd");
    return `device_${device.deviceId}_${suffix}`;
  }
}
