import { Provider } from "@/entities/googleAppsScript/adapters/Provider";
import { ForTest } from "@/entities/googleAppsScript/adapters/blobGenerator/ForTest";
import { Interface } from "@/entities/googleAppsScript/adapters/blobGenerator/Interface";
import { WithUtilities } from "@/entities/googleAppsScript/adapters/blobGenerator/WithUtilities";

export const provider = new Provider<Interface>({
  provideforTest: () => new ForTest(),
  provideForGoogleAppsScript: () => new WithUtilities(),
});
