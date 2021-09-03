import { greeter } from "@/hello";

describe(greeter.name, () => {
  it("should return greeting", () => {
    const actual = greeter("John");

    const expected = "Hello, John!";
    expect(actual).toBe(expected);
  });
});
