import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { PaginationService } from 'src/shared/pagination/pagination.service';

@Module({
  imports: [PrismaModule],
  controllers: [LocationController],
  providers: [LocationService, PaginationService],
  exports: [LocationService],
})
export class LocationModule {}
