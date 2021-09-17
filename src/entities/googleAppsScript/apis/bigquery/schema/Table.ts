export interface Table {
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
  fields: TableFieldSchema[];
}
