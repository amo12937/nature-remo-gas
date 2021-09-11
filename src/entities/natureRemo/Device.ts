import { Movement } from "@/entities/natureRemo/Movement";

export type Device = {
  deviceId: string;
  datetime: Date;
  temperature: number;
  humidity: number;
  illumination: number;
  movement: Movement;
};
