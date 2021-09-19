export interface Config {
  core: {
    timezone: string;
  };
  googleAppsScript: {
    apis: {
      bigquery: {
        projectId: string;
        datasetId: string;
        retry?:
          | {
              retries?: number | undefined;
            }
          | undefined;
      };
    };
  };
}
