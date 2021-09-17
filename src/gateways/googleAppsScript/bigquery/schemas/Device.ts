import { DateTime } from "luxon";
import { Device } from "@/entities/natureRemo/Device";
import { Movement } from "@/entities/natureRemo/Movement";

export const deviceSchema = {
  fields: [
    {
      name: "insertId",
      type: "STRING",
    },
    {
      name: "deviceId",
      type: "STRING",
    },
    {
      name: "createdAt",
      type: "DATETIME",
    },
    {
      name: "temperature",
      type: "INTEGER",
    },
    {
      name: "humidity",
      type: "INTEGER",
    },
    {
      name: "illumination",
      type: "INTEGER",
    },
    {
      name: "movement",
      type: "BOOL",
    },
  ],
} as const;

export interface Record {
  readonly insertId: string;
  readonly deviceId: string;
  readonly datetime: DateTime;
  readonly temperature: number;
  readonly humidity: number;
  readonly illumination: number;
  readonly isMoved: boolean;
}

export const convertToDeviceRecord = (device: Device): Record => ({
  insertId: convertDeviceToInsertId(device),
  deviceId: device.deviceId,
  datetime: device.datetime,
  temperature: device.temperature,
  humidity: device.humidity,
  illumination: device.illumination,
  isMoved: convertToIsMoved(device.movement),
});

export const convertDeviceToInsertId = (device: Device): string => {
  const yyyyMMddHHmm = device.datetime.toUTC().toFormat("yyyyMMddHHmm");
  return `${device.deviceId} ${yyyyMMddHHmm}`;
};

export const convertToIsMoved = (movement: Movement): boolean =>
  movement === Movement.Moved;
