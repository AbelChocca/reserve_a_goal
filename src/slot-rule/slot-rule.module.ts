import { Module } from '@nestjs/common';
import { SlotRuleService } from './slot-rule.service';

@Module({
  providers: [SlotRuleService],
  exports: [SlotRuleService],
})
export class SlotRuleModule {}
