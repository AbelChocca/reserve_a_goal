import { DayOfWeek } from '@prisma/client';

export type BaseSlot = {
  startTime: Date;
  endTime: Date;
  dayOfWeek: DayOfWeek;
};

export type SlotStatus = 'AVAILABLE' | 'BOOKED';

export type Slot = BaseSlot & {
  status: SlotStatus;
};
