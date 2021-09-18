import { Device } from "@/entities/natureRemo/Device";
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
  insert(device: Device): Promise<void>;
}

export const newRepository = (config: Config): RepositoryInterface =>
  new Repository(Bigquery, new TableProvider(config), { createJob });

export class Repository implements RepositoryInterface {
  readonly bigquery: GoogleAppsScript.Bigquery;
  readonly tableProvider: TableProviderInterface;
  readonly jobProvider: JobProviderInterface;

  constructor(
    bigquery: GoogleAppsScript.Bigquery,
    tableProvider: TableProviderInterface,
    jobProvider: JobProviderInterface
  ) {
    this.bigquery = bigquery;
    this.tableProvider = tableProvider;
    this.jobProvider = jobProvider;
  }

  insert(device: Device): Promise<void> {
    const table = this.tableProvider.createTable(device);
    const createdTable = this.bigquery.Tables.insert(
      table,
      table.tableReference.projectId,
      table.tableReference.datasetId
    );

    const record = convertToDeviceRecord(device);

    const job = this.jobProvider.createJob(createdTable);
    this.bigquery.Jobs.insert(job, table.tableReference.projectId, record);
  }
}
