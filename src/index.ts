import { run } from "@/main";

declare const global: {
  [x: string]: unknown;
};

global.run = run;
