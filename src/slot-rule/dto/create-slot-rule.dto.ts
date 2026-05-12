import { ApiProperty } from '@nestjs/swagger';
import { DayOfWeek } from '@prisma/client';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsString,
  Matches,
  Min,
} from 'class-validator';

export class CreateSlotRuleDto {
  @IsEnum(DayOfWeek)
  dayOfWeek!: DayOfWeek;

  @ApiProperty({
    example: '08:00',
  })
  @IsString()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
  startTime!: string;

  @ApiProperty({
    example: '22:00',
  })
  @IsString()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
  endTime!: string;

  @ApiProperty({
    example: 60,
  })
  @IsInt()
  @Min(1)
  slotMinutes!: number;

  @ApiProperty({
    example: true,
  })
  @IsBoolean()
  isActive!: boolean;
}
