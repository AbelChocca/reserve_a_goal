import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PaginationDto } from 'src/common/pagination/pagination.dto';
import { CreateLocationDto } from './dto/create-location.dto';
import { LocationService } from './location.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/auth.decorators';
import { UserRole } from '@prisma/client';

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

  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN_LOCAL, UserRole.SUPER_ADMIN)
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
