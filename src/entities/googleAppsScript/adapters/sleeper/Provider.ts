import { Provider } from "@/entities/googleAppsScript/adapters/Provider";
import { Interface } from "@/entities/googleAppsScript/adapters/sleeper/Interface";
import { WithSetTimeout } from "@/entities/googleAppsScript/adapters/sleeper/WithSetTimeout";
import { WithUtilities } from "@/entities/googleAppsScript/adapters/sleeper/WithUtilities";

export const provider = new Provider<Interface>({
  provideforTest: () => new WithSetTimeout(),
  provideForGoogleAppsScript: () => new WithUtilities(),
});
