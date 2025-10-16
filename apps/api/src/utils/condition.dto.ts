import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class ConditionDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    example: '>',
    description: 'Operator for the condition',
  })
  operator?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: '2025-05-09',
    description: 'Value for the condition',
  })
  value?: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    example: false,
    description: 'Optional flag for the condition',
  })
  flag?: boolean;
}
