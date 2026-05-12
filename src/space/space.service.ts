import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateSpaceDto } from './dto/create-space.dto';
import { SlotRuleService } from 'src/slot-rule/slot-rule.service';
import { GetSpaceScheduleDto } from 'src/space/dto/get-space-schedule.dto';
import {
  generateSlotsFromRules,
  groupByDay,
  overlaps,
} from 'src/common/utils/date.util';
import { Slot } from 'src/slot-rule/slot-rule.types';

@Injectable()
export class SpaceService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly slotRuleService: SlotRuleService,
  ) {}

  async createSpace(localId: string, createSpaceDto: CreateSpaceDto) {
    this.validateSpace(createSpaceDto);
    createSpaceDto.slotRules.forEach((r) =>
      this.slotRuleService.validateSlotRule(r),
    );

    return this.prismaService.prisma.$transaction(async (tx) => {
      const space = await tx.space.create({
        data: {
          name: createSpaceDto.name,
          description: createSpaceDto.description,
          location: {
            connect: {
              id: localId,
            },
          },
        },
      });

      const data = createSpaceDto.slotRules.map((r) =>
        this.slotRuleService.buildSlotRule(space.id, r),
      );

      await tx.slotRule.createMany({
        data,
      });

      return space;
    });
  }

  async getSpaceSchedule(spaceId: string, filter: GetSpaceScheduleDto) {
    const startOfWeek = new Date(filter.weekStartDate);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 7);

    const rules = await this.prismaService.prisma.slotRule.findMany({
      where: {
        spaceId,
        isActive: filter.isActive ?? true,
      },
    });

    const bookings = await this.prismaService.prisma.booking.findMany({
      where: {
        spaceId,
        status: 'CONFIRMED',
        startTime: {
          gte: startOfWeek,
          lt: endOfWeek,
        },
      },
    });

    const slots = generateSlotsFromRules({
      weekStartDate: startOfWeek,
      slotRules: rules,
    });

    const slotsWithStatus: Slot[] = slots.map((slot) => {
      const isBooked = bookings.some((b) =>
        overlaps(slot.startTime, slot.endTime, b.startTime, b.endTime),
      );

      return {
        ...slot,
        status: isBooked ? 'BOOKED' : 'AVAILABLE',
      };
    });

    const grouped = groupByDay(slotsWithStatus);

    return grouped;
  }

  private validateSpace(dto: CreateSpaceDto) {
    if (!dto.slotRules.length) {
      throw new BadRequestException('At least one slot rule required');
    }
    const days = dto.slotRules.map((s) => s.dayOfWeek);

    const uniqueDays = new Set(days);

    if (days.length != uniqueDays.size) {
      throw new BadRequestException('Duplicated days in slot rules.');
    }
  }
}
