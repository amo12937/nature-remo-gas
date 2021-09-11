import { Config } from "@/entities/natureRemo/Config";
import { Device } from "@/entities/natureRemo/Device";

export class Repository {
  config: Config;

  constructor(config: Config) {
    this.config = config;
  }

  getDevices(): Device[] {
    return [];
  }
}
