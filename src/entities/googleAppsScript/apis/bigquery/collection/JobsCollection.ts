import { Job } from "@/entities/googleAppsScript/apis/bigquery/schema/Job";

export interface JobsCollection {
  insert(resource: Job, projectId: string, mediaData: any): Job;
}
