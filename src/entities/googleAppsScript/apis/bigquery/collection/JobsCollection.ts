import { Job } from "@/entities/googleAppsScript/apis/bigquery/schema/Job";

export interface JobsCollection {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  insert(resource: Job, projectId: string, mediaData: any): Job;
}
