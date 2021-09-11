import retry from "async-retry";

export const greeter = async (person: string): Promise<string> => await retry(
  async (): string => {
    return `Hello, ${person}!`;
  },
  {
    retries: 5,
  }
);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function testGreeter(): void {
  const user = "Grant";
  const greetingText = await greeter(user);
  Logger.log(greetingText);
}
