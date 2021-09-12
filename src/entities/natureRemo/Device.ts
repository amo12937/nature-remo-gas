import { DateTime } from "luxon";
import { Movement } from "@/entities/natureRemo/Movement";

export interface Device {
  readonly deviceId: string;
  readonly datetime: DateTime;
  readonly temperature: number;
  readonly humidity: number;
  readonly illumination: number;
  readonly movement: Movement;
}
