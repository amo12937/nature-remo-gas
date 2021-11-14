import { isNotFound } from "@/entities/googleAppsScript/errors/NotFound";

describe(isNotFound.name, () => {
  it("should return true when it is NotFound", () => {
    const target = {
      name: "name",
      details: {
        code: 404,
      },
    };

    const actual = isNotFound(target);

    const expected = true;
    expect(actual).toBe(expected);
  });

  it("should return false when it does not have name", () => {
    const target = {
      details: {
        code: 404,
      },
    };

    const actual = isNotFound(target);

    const expected = false;
    expect(actual).toBe(expected);
  });

  it("should return false when it does not have details", () => {
    const target = {
      name: "name",
    };

    const actual = isNotFound(target);

    const expected = false;
    expect(actual).toBe(expected);
  });

  it("should return true when code is not 404", () => {
    const target = {
      name: "name",
      details: {
        code: 403,
      },
    };

    const actual = isNotFound(target);

    const expected = false;
    expect(actual).toBe(expected);
  });
});
