export interface JobProviderInterface {
  createJob(
    table: GoogleAppsScript.BigQuery.Schema.Table
  ): GoogleAppsScript.BigQuery.Schema.Job;
}

export const createJob = (
  table: GoogleAppsScript.BigQuery.Schema.Table
): GoogleAppsScript.BigQuery.Schema.Job => ({
  configuration: {
    load: {
      destinationTable: table.tableReference,
    },
  },
});
