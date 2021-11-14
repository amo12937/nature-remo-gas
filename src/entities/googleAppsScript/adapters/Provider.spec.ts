import {
  Provider,
  setIsGoogleAppsScriptEnvironment
} from "@/entities/googleAppsScript/adapters/Provider"

describe(Provider.name, () => {
  describe("provide", () => {
    it("should use provideForTest when isGoogleAppsScriptEnvironment is false", () => {
      const target = new Provider({
        provideforTest: () => 1,
        provideForGoogleAppsScript: () => 2,
      });

      const actual = target.provide();

      const expected = 1;
      expect(actual).toBe(expected);
    });

    it("should use provideForGoogleAppsScript when isGoogleAppsScriptEnvironment is true", () => {
      const target = new Provider({
        provideforTest: () => 1,
        provideForGoogleAppsScript: () => 2,
      });
      setIsGoogleAppsScriptEnvironment(true);

      const actual = target.provide();

      const expected = 2;
      expect(actual).toBe(expected);
    });
  });
});

