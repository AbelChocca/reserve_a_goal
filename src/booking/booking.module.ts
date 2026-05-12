import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { PrismaModule } from 'prisma/prisma.module';
import { BookingController } from './booking.controller';

@Module({
  imports: [PrismaModule],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
