import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { SpaceService } from './space.service';
import { GetSpaceScheduleDto } from './dto/get-space-schedule.dto';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateSpaceDto } from './dto/create-space.dto';

@ApiTags('Spaces')
@Controller('spaces')
export class SpaceController {
  constructor(private readonly spaceService: SpaceService) {}
  @Get(':spaceId/schedule')
  @HttpCode(200)
  @ApiQuery({ type: GetSpaceScheduleDto })
  getSpaceSchedule(
    @Param('spaceId') spaceId: string,
    @Query() dto: GetSpaceScheduleDto,
  ) {
    return this.spaceService.getSpaceSchedule(spaceId, dto);
  }

  @Post(':localId')
  @HttpCode(201)
  @ApiBody({ type: CreateSpaceDto })
  createSpace(@Param('localId') localId: string, @Body() dto: CreateSpaceDto) {
    return this.spaceService.createSpace(localId, dto);
  }
}
