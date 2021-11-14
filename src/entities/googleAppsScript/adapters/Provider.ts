type ProvideFunction<T> = () => T;

let isGoogleAppsScriptEnvironment = false;
export const setIsGoogleAppsScriptEnvironment = (
  isGASEnvironment: boolean
): void => {
  isGoogleAppsScriptEnvironment = isGASEnvironment;
};

export class Provider<T> {
  provideforTest: ProvideFunction<T>;
  provideForGoogleAppsScript: ProvideFunction<T>;

  constructor(args: {
    provideforTest: ProvideFunction<T>;
    provideForGoogleAppsScript: ProvideFunction<T>;
  }) {
    this.provideforTest = args.provideforTest;
    this.provideForGoogleAppsScript = args.provideForGoogleAppsScript;
  }

  provide(): T {
    if (isGoogleAppsScriptEnvironment) {
      return this.provideForGoogleAppsScript();
    }
    return this.provideforTest();
  }
}
