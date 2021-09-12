import { DateTime } from "luxon";
import { Movement } from "@/entities/natureRemo/Movement";
import { Device as DeviceEntity } from "@/entities/natureRemo/Device";

export class Device implements DeviceEntity {
  readonly deviceId: string;
  readonly datetime: DateTime;
  readonly temperature: number;
  readonly humidity: number;
  readonly illumination: number;
  readonly movement: Movement;

  constructor(currentDatetime: DateTime, deviceApiOutput: DeviceApiOutput) {
    this.deviceId = deviceApiOutput.id;
    this.datetime = currentDatetime;

    const events = deviceApiOutput.newest_events;
    this.temperature = events.te.val;
    this.humidity = events.hu.val;
    this.illumination = events.il.val;
    const lastMovedAt = DateTime.fromISO(events.mo.created_at);
    this.movement = isMovedAtTheLastOneMinute(currentDatetime, lastMovedAt);
  }
}

export const isMovedAtTheLastOneMinute = (
  currentDatetime: DateTime,
  lastMovedAt: DateTime
): Movement => {
  if (lastMovedAt < currentDatetime.minus({ minutes: 1 })) {
    return Movement.Unmoved;
  }
  return Movement.Moved;
};

export type Event = {
  val: number;
  created_at: string;
};

export type DeviceApiOutput = {
  id: string;
  newest_events: {
    te: Event;
    hu: Event;
    il: Event;
    mo: Event;
  };
};
