import { Provider } from "@/entities/googleAppsScript/adapters/Provider";
import { Interface } from "@/entities/googleAppsScript/adapters/logger/Interface";

export const provider = new Provider<Interface>({
  provideforTest: () => console,
  provideForGoogleAppsScript: () => Logger,
});
