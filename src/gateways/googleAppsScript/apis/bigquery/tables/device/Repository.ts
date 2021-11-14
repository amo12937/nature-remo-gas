import retry from "async-retry";
import { provider as loggerProvider } from "@/entities/googleAppsScript/adapters/logger/Provider";
import { Device } from "@/entities/natureRemo/Device";
import { Config } from "@/entities/googleAppsScript/apis/bigquery/Config";
import {
  createJob,
  JobProviderInterface,
} from "@/gateways/googleAppsScript/apis/bigquery/tables/device/JobProvider";
import { convertToDeviceRecord } from "@/gateways/googleAppsScript/apis/bigquery/tables/device/Record";
import {
  TableProvider,
  TableProviderInterface,
} from "@/gateways/googleAppsScript/apis/bigquery/tables/device/TableProvider";

export interface RepositoryInterface {
  insertAll(devices: Device[]): Promise<void>;
  insert(device: Device): Promise<void>;
}

export interface BigQueryInterface {
  Jobs?: GoogleAppsScript.BigQuery.Collection.JobsCollection | undefined;
  Tables?: GoogleAppsScript.BigQuery.Collection.TablesCollection | undefined;
}

export const newRepository = (config: Config): RepositoryInterface =>
  new Repository(config, Bigquery, new TableProvider(config), { createJob });

export class Repository implements RepositoryInterface {
  readonly config: Config;
  readonly bigquery: BigQueryInterface;
  readonly tableProvider: TableProviderInterface;
  readonly jobProvider: JobProviderInterface;

  constructor(
    config: Config,
    bigquery: BigQueryInterface,
    tableProvider: TableProviderInterface,
    jobProvider: JobProviderInterface
  ) {
    this.config = config;
    this.bigquery = bigquery;
    this.tableProvider = tableProvider;
    this.jobProvider = jobProvider;
  }

  async insertAll(devices: Device[]): Promise<void> {
    for (const device of devices) {
      await this.insert(device);
    }
  }

  insert(device: Device): Promise<void> {
    return retry(
      async (bail: (e: Error) => void) => {
        if (this.bigquery.Tables === undefined) {
          bail(new TypeError("Tables must be defined"));
          return;
        }

        if (this.bigquery.Jobs === undefined) {
          bail(new TypeError("Jobs must be defined"));
          return;
        }

        const table = this.tableProvider.createTable(device);
        if (table.tableReference === undefined) {
          bail(new TypeError("tableReference must be defined"));
          return;
        }

        if (table.tableReference.projectId === undefined) {
          bail(new TypeError("projectId must be defined"));
          return;
        }

        if (table.tableReference.datasetId === undefined) {
          bail(new TypeError("projectId must be defined"));
          return;
        }

        const createdTable = this.bigquery.Tables.insert(
          table,
          table.tableReference.projectId,
          table.tableReference.datasetId
        );

        const record = convertToDeviceRecord(device);

        const job = this.jobProvider.createJob(createdTable);
        this.bigquery.Jobs.insert(job, table.tableReference.projectId, record);
      },
      {
        retries: this.config.googleAppsScript.apis.bigquery.retry?.retries ?? 5,
        onRetry: (e: Error): void => {
          const logger = loggerProvider.provide();
          logger.log(e);
        },
      }
    );
  }
}
