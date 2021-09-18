import { Job } from "@/entities/googleAppsScript/apis/bigquery/schema/Job";
import { Table } from "@/entities/googleAppsScript/apis/bigquery/schema/Table";

export const createJob = (table: Table): Job => ({
  configuration: {
    load: {
      destinationTable: table.tableReference,
    },
  },
});
