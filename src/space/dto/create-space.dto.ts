import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateSlotRuleDto } from 'src/slot-rule/dto/create-slot-rule.dto';

export class CreateSpaceDto {
  @ApiProperty()
  @IsString()
  name!: string;

  @ApiProperty()
  @IsOptional()
  description?: string;

  @ApiProperty({
    type: [CreateSlotRuleDto],
  })
  @ValidateNested({ each: true })
  @Type(() => CreateSlotRuleDto)
  slotRules!: CreateSlotRuleDto[];
}
