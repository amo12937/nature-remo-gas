import { Interface } from "@/entities/googleAppsScript/adapters/blobGenerator/Interface";

export class WithUtilities implements Interface {
  generateBlob<T>(records: T[]): GoogleAppsScript.Base.Blob | null {
    return Utilities.newBlob(
      records.map((record: T): string => JSON.stringify(record)).join("\n"),
      "text/plain"
    );
  }
}
