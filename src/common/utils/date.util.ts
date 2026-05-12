import { DayOfWeek } from '@prisma/client';
import { fromZonedTime } from 'date-fns-tz';
import { BaseSlot, Slot } from 'src/slot-rule/slot-rule.types';

export const TIMEZONE = 'America/Lima';
type GroupedSlots = Partial<Record<DayOfWeek, Slot[]>>;

export function roundUpToStep(date: Date, stepMinutes: number): Date {
  const ms = date.getTime();
  const stepMs = stepMinutes * 60 * 1000;

  return new Date(Math.ceil(ms / stepMs) * stepMs);
}

export function generateSlotsFromRules(params: {
  weekStartDate: Date; // lunes de la semana o base
  slotRules: {
    dayOfWeek: DayOfWeek;
    startTime: string;
    endTime: string;
    slotMinutes: number;
  }[];
}): BaseSlot[] {
  const { weekStartDate, slotRules } = params;

  const slots: BaseSlot[] = [];

  for (const rule of slotRules) {
    // 1. calculamos fecha real del día
    const baseDate = getDateForWeekDay(weekStartDate, rule.dayOfWeek);

    let current = fromZonedTime(
      `${formatDate(baseDate)} ${rule.startTime}`,
      TIMEZONE,
    );

    const end = fromZonedTime(
      `${formatDate(baseDate)} ${rule.endTime}`,
      TIMEZONE,
    );

    // 2. generar slots por regla
    while (current < end) {
      const next = new Date(current.getTime() + rule.slotMinutes * 60000);

      if (next > end) break;

      slots.push({
        startTime: new Date(current),
        endTime: new Date(next),
        dayOfWeek: rule.dayOfWeek,
      });

      current = next;
    }
  }

  return slots;
}

function getDateForWeekDay(weekStart: Date, day: DayOfWeek): Date {
  const map = {
    MONDAY: 0,
    TUESDAY: 1,
    WEDNESDAY: 2,
    THURSDAY: 3,
    FRIDAY: 4,
    SATURDAY: 5,
    SUNDAY: 6,
  };

  const result = new Date(weekStart);
  result.setDate(result.getDate() + map[day]);

  return result;
}

function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function overlaps(aStart: Date, aEnd: Date, bStart: Date, bEnd: Date) {
  return aStart < bEnd && aEnd > bStart;
}

export function groupByDay(slots: Slot[]) {
  return slots.reduce<GroupedSlots>((acc, slot) => {
    const key = slot.dayOfWeek;

    if (!acc[key]) acc[key] = [];

    acc[key].push(slot);

    return acc;
  }, {});
}
