import { Job } from "@/entities/googleAppsScript/apis/bigquery/schema/Job";
import { Table } from "@/entities/googleAppsScript/apis/bigquery/schema/Table";

export interface JobProviderInterface {
  createJob(table: Table): Job;
}

export const createJob = (table: Table): Job => ({
  configuration: {
    load: {
      destinationTable: table.tableReference,
    },
  },
});
