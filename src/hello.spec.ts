import { greeter } from "@/hello";

describe(greeter.name, () => {
  it("should return greeting", async () => {
    const actual = await greeter("John");

    const expected = "Hello, John!";
    expect(actual).toBe(expected);
  });
});
