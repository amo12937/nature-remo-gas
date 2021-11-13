import { Interface } from "@/entities/googleAppsScript/adapters/sleeper/Interface";

export class WithUtilities implements Interface {
  sleep(milliseconds: number): Promise<void> {
    return new Promise((resolve) => {
      Utilities.sleep(milliseconds);
      resolve();
    });
  }
}
