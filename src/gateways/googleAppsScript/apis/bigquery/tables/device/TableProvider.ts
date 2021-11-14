import { Config } from "@/entities/googleAppsScript/apis/bigquery/Config";
import { schema } from "@/gateways/googleAppsScript/apis/bigquery/tables/device/Schema";

export interface TableProviderInterface {
  createTable(): GoogleAppsScript.BigQuery.Schema.Table;
}

export class TableProvider implements TableProviderInterface {
  readonly config: Config;

  constructor(config: Config) {
    this.config = config;
  }

  createTable(): GoogleAppsScript.BigQuery.Schema.Table {
    return {
      tableReference: {
        datasetId: this.config.googleAppsScript.apis.bigquery.datasetId,
        projectId: this.config.googleAppsScript.apis.bigquery.projectId,
        tableId: "devices",
      },
      schema,
    };
  }
}
