import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';
import { FolderType } from '../storage.types';

export class GenerateSasBatchDto {
  @ApiProperty()
  @IsArray()
  filesName!: string[];

  @ApiProperty({
    examples: ['users'],
  })
  @IsEnum(FolderType)
  folder!: FolderType;

  @ApiProperty()
  @IsOptional()
  @IsString()
  entityId!: string;
}
