import { testGreeter } from "@/hello";

declare const global: {
  [x: string]: unknown;
};

global.testGreeter = testGreeter;
