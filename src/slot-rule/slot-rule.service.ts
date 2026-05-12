import { Injectable } from '@nestjs/common';
import { CreateSlotRuleDto } from './dto/create-slot-rule.dto';
import { timeToMinutes } from 'src/common/utils/time.util';

@Injectable()
export class SlotRuleService {
  buildSlotRule(spaceId: string, rule: CreateSlotRuleDto) {
    return {
      spaceId,
      dayOfWeek: rule.dayOfWeek,
      startTime: rule.startTime,
      endTime: rule.endTime,
      slotMinutes: rule.slotMinutes,
      isActive: rule.isActive ?? true,
    };
  }

  validateSlotRule(rule: CreateSlotRuleDto) {
    const start = timeToMinutes(rule.startTime);
    const end = timeToMinutes(rule.endTime);

    if (start >= end) {
      throw new Error(`Invalid time range for ${rule.dayOfWeek}`);
    }

    if ((end - start) % rule.slotMinutes != 0) {
      throw new Error('The time interval is not adequate.');
    }
  }
}
