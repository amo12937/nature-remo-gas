import { Interface } from "@/entities/googleAppsScript/adapters/blobGenerator/Interface";
import { provider as loggerProvider } from "@/entities/googleAppsScript/adapters/logger/Provider";

export class ForTest implements Interface {
  generateBlob(): GoogleAppsScript.Base.Blob | null {
    const logger = loggerProvider.provide();
    logger.log(
      "warning: GoogleAppsScript.Base.Blob cannot be used in test environment. return null."
    );
    return null;
  }
}
