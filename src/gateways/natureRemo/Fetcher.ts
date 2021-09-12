export interface Fetcher {
  fetch(url: string, params: URLFetchRequestOptions): HTTPResponse;
}

export interface HTTPResponse {
  getContentText(): string;
}

export interface URLFetchRequestOptions {
  headers?: HttpHeaders | undefined;
  method?: HttpMethod | undefined;
}

export interface HttpHeaders {
  [key: string]: string;
}

export type HttpMethod = "get" | "delete" | "patch" | "post" | "put";
