import { Interface } from "@/entities/googleAppsScript/adapters/sleeper/Interface";

export class WithSetTimeout implements Interface {
  sleep(milliseconds: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(resolve, milliseconds);
    });
  }
}
