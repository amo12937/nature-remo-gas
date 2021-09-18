export interface Table {
  readonly id?: string | undefined;
  readonly tableReference: TableReference;
  readonly schema: TableSchema;
}

export interface TableFieldSchema {
  readonly name: string;
  readonly type: string;
}

export interface TableReference {
  readonly datasetId: string;
  readonly projectId: string;
  readonly tableId: string;
}

export interface TableSchema {
  readonly fields: TableFieldSchema[];
}
