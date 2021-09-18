import { TableReference } from "@/entities/googleAppsScript/apis/bigquery/schema/Table";

export interface Job {
  configuration: JobConfiguration;
}

export interface JobConfiguration {
  load: JobConfigurationLoad;
}

export interface JobConfigurationLoad {
  destinationTable: TableReference;
}
