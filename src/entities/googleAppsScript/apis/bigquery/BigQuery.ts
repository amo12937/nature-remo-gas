import { JobsCollection } from "@/entities/googleAppsScript/apis/bigquery/collection/JobsCollection";
import { TablesCollection } from "@/entities/googleAppsScript/apis/bigquery/collection/TablesCollection";

export interface BigQueryInterface {
  Jobs: JobsCollection;
  Tables: TablesCollection;
};
