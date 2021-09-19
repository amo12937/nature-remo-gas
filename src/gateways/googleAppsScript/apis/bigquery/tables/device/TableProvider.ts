import { Config } from "@/entities/googleAppsScript/apis/bigquery/Config";
import { Device } from "@/entities/natureRemo/Device";
import { schema } from "@/gateways/googleAppsScript/apis/bigquery/tables/device/Schema";

export interface TableProviderInterface {
  createTable(device: Device): GoogleAppsScript.BigQuery.Schema.Table;
}

export class TableProvider implements TableProviderInterface {
  readonly config: Config;

  constructor(config: Config) {
    this.config = config;
  }

  createTable(device: Device): GoogleAppsScript.BigQuery.Schema.Table {
    return {
      tableReference: {
        datasetId: this.config.googleAppsScript.apis.bigquery.datasetId,
        projectId: this.config.googleAppsScript.apis.bigquery.projectId,
        tableId: this.convertToTableId(device),
      },
      schema,
    };
  }

  convertToTableId(device: Device): string {
    const suffix = device.datetime
      .setZone(this.config.core.timezone)
      .toFormat("yyyyMMdd");
    return `device_${device.deviceId}_${suffix}`;
  }
}
