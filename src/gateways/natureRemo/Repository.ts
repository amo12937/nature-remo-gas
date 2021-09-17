import { DateTime } from "luxon";
import { Config } from "@/entities/natureRemo/Config";
import { Device as DeviceEntity } from "@/entities/natureRemo/Device";
import { Device, DeviceApiOutput } from "@/gateways/natureRemo/Device";
import {
  UrlFetchAppInterface,
  HttpHeaders,
  URLFetchRequestOptions,
} from "@/entities/googleAppsScript/urlFetchApp/UrlFetchAppInterface";

export interface RepositoryInterface {
  getDevices(currentDatetime: DateTime): Device[];
}

export const newRepository = (config: Config): RepositoryInterface =>
  new Repository(config, UrlFetchApp);

export class Repository {
  config: Config;
  urlFetchApp: UrlFetchAppInterface;

  constructor(config: Config, urlFetchApp: UrlFetchAppInterface) {
    this.config = config;
    this.urlFetchApp = urlFetchApp;
  }

  createHeader(): HttpHeaders {
    return {
      "Content-Type": "application/json;",
      Authorization: `Bearer ${this.config.accessToken}`,
    };
  }

  getDevices(currentDatetime: DateTime): DeviceEntity[] {
    const url = `${this.config.baseUrl}/1/devices`;
    const params: URLFetchRequestOptions = {
      method: "get",
      headers: this.createHeader(),
    };
    const response: DeviceApiOutput[] = JSON.parse(
      this.urlFetchApp.fetch(url, params).getContentText()
    );

    return response.map(
      (deviceApiOutput: DeviceApiOutput) =>
        new Device(currentDatetime, deviceApiOutput)
    );
  }
}
