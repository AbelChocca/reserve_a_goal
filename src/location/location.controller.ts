import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { PaginationDto } from 'src/shared/pagination/pagination.dto';
import { CreateLocationDto } from './dto/create-location.dto';
import { LocationService } from './location.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Locations')
@Controller('locations')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get()
  @HttpCode(200)
  findFiltered(@Query() paginationDto: PaginationDto) {
    return this.locationService.findFiltered(
      paginationDto.page,
      paginationDto.take,
    );
  }

  @Post(':userId')
  @HttpCode(201)
  @ApiBody({ type: CreateLocationDto })
  createPerUser(
    @Param('userId') userId: string,
    @Body() createLocationDto: CreateLocationDto,
  ) {
    return this.locationService.createLocation(userId, createLocationDto);
  }
}
