import { Module } from '@nestjs/common';
import { SpaceService } from './space.service';
import { PrismaModule } from 'prisma/prisma.module';
import { SlotRuleModule } from 'src/slot-rule/slot-rule.module';
import { SpaceController } from './space.controller';

@Module({
  imports: [PrismaModule, SlotRuleModule],
  providers: [SpaceService],
  controllers: [SpaceController],
})
export class SpaceModule {}
