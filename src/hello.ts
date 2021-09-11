import retry from "async-retry";
import config from "@/config/config";
import { Config } from "@/config/type";

export const getConfig = (): Config => {
  return config;
};

export const greeter = (person: string): Promise<string> =>
  retry(
    (): string => {
      return `Hello, ${person}!`;
    },
    {
      retries: 5,
    }
  );

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function testGreeter(): Promise<void> {
  const user = "Grant";
  const greetingText = await greeter(user);
  Logger.log(greetingText);
  Logger.log(getConfig());
}
