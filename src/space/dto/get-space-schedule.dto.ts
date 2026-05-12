import { ApiProperty } from '@nestjs/swagger';
import { DayOfWeek } from '@prisma/client';
import { IsBoolean, IsDate, IsEnum } from 'class-validator';

export class GetSpaceScheduleDto {
  @ApiProperty()
  @IsDate()
  weekStartDate!: Date;

  @ApiProperty()
  @IsEnum(DayOfWeek)
  dayOfWeek!: DayOfWeek;

  @ApiProperty()
  @IsBoolean()
  isActive!: boolean;
}
