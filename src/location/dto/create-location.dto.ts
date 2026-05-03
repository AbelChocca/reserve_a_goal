import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateLocationDto {
  @ApiProperty()
  @IsString()
  @MinLength(6)
  @MaxLength(55)
  name!: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  city!: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  address!: string;
}
