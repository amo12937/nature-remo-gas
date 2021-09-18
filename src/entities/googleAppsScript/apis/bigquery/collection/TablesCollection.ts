import { Table } from "@/entities/googleAppsScript/apis/bigquery/schema/Table";

export interface TablesCollection {
  insert(resource: Table, projectId: string, datasetId: string): Table;
}

