import { Config as BaseConfig } from "@/entities/Config";

export interface Config {
  core: BaseConfig["core"];
  googleAppsScript: BaseConfig["googleAppsScript"];
}
