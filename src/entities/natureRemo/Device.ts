import { Movement } from "@/entities/natureRemo/Movement";

export interface Device {
  readonly deviceId: string;
  readonly datetime: Date;
  readonly temperature: number;
  readonly humidity: number;
  readonly illumination: number;
  readonly movement: Movement;
}
