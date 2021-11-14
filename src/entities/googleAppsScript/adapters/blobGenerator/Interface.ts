export interface Interface {
  generateBlob<T>(records: T[]): GoogleAppsScript.Base.Blob | null;
}
