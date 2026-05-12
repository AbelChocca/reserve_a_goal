import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { PaginationService } from 'src/common/pagination/pagination.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [LocationController],
  providers: [LocationService, PaginationService],
})
export class LocationModule {}
