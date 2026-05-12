import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { PaginationService } from 'src/common/pagination/pagination.service';
import { Location } from '@prisma/client';
import type { PublicLocation } from './location.types';

@Injectable()
export class LocationService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly paginationService: PaginationService,
  ) {}

  async createLocation(userId: string, dto: CreateLocationDto) {
    const location = await this.prismaService.prisma.location.create({
      data: {
        name: dto.name,
        city: dto.city,
        address: dto.address,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return {
      message: 'Location created succesfully',
      id: location.id,
    };
  }

  async findFiltered(page: number, take: number) {
    const skip = this.paginationService.getSkip(page, take);
    const locations = await this.prismaService.prisma.location.findMany({
      skip: skip,
      take: take,
    });

    return this.toPublicMany(locations);
  }

  private toPublicMany(data: Location[]): PublicLocation[] {
    return data.map((d) => ({
      id: d.id,
      name: d.name,
      city: d.city,
      address: d.address,
    }));
  }
}
