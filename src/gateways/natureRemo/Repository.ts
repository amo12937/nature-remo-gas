import {
  UrlFetchApp,
  URLFetchRequestOptions,
  HTTPHeader,
  HTTPResponse,
} from "google-apps-script";
import { DateTime } from "luxon";
import { Config } from "@/entities/natureRemo/Config";
import { Device as DeviceEntity } from "@/entities/natureRemo/Device";
import { Device, DeviceApiOutput } from "@/gateways/natureRemo/Device";

export interface RepositoryInterface {
  getDevices(): Device[];
}

export interface Fetcher {
  fetch(url: string, params: URLFetchRequestOptions): HTTPResponse;
}

export const newRepository = (config: Config): RepositoryInterface =>
  new Repository(config, UrlFetchApp);

export class Repository {
  config: Config;
  fetcher: Fetcher;

  constructor(config: Config, fetcher: Fetcher) {
    this.config = config;
    this.fetcher = fetcher;
  }

  createHeader(): HTTPHeader {
    return {
      "Content-Type": "application/json;",
      Authorization: `Bearer ${this.config.accessToken}`,
    };
  }

  getDevices(currentDatetime: DateTime): DeviceEntity[] {
    const url = `${this.config.baseUrl}/1/devices`;
    const params = {
      method: "get",
      headers: this.createHeader(),
    };
    const response: DeviceApiOutput[] = JSON.parse(
      this.fetcher.fetch(url, params).getContentText()
    );

    return response.map(
      (deviceApiOutput: DeviceApiOutput) =>
        new Device(currentDatetime, deviceApiOutput)
    );
  }
}
