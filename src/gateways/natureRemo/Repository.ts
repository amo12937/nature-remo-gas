import {
  UrlFetchApp,
  URLFetchRequestOptions,
  HTTPHeader,
  HTTPResponse,
} from "google-apps-script";
import { Config } from "@/entities/natureRemo/Config";
import { Device } from "@/entities/natureRemo/Device";

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

  getDevices(): Device[] {
    const url = `${this.config.baseUrl}/1/devices`;
    const params = {
      method: "get",
      headers: this.createHeader(),
    };
    const response = JSON.parse(this.fetcher.fetch(url, params));
    console.log(response);
    return [];
  }
}
