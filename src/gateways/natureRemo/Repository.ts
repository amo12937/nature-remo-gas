import { DateTime } from "luxon";
import { Config } from "@/entities/natureRemo/Config";
import { Device as DeviceEntity } from "@/entities/natureRemo/Device";
import { Device, DeviceApiOutput } from "@/gateways/natureRemo/Device";

export interface RepositoryInterface {
  getDevices(currentDatetime: DateTime): DeviceEntity[];
}

export const newRepository = (config: Config): RepositoryInterface =>
  new Repository(config, UrlFetchApp);

export class Repository {
  config: Config;
  urlFetchApp: GoogleAppsScript.URL_Fetch.UrlFetchApp;

  constructor(
    config: Config,
    urlFetchApp: GoogleAppsScript.URL_Fetch.UrlFetchApp
  ) {
    this.config = config;
    this.urlFetchApp = urlFetchApp;
  }

  createHeader(): GoogleAppsScript.URL_Fetch.HttpHeaders {
    return {
      "Content-Type": "application/json;",
      Authorization: `Bearer ${this.config.accessToken}`,
    };
  }

  getDevices(currentDatetime: DateTime): DeviceEntity[] {
    const url = `${this.config.baseUrl}/1/devices`;
    const params: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
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
