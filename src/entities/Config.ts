export interface Config {
  core: {
    timezone: string;
  };
  natureRemo: {
    accessToken: string;
    baseUrl: string;
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
