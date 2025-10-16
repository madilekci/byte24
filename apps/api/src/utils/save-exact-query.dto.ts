import { Enum, String } from '@byte24/api';
import { ExactActionProcedure, ExactActionType } from '@byte24/api/api/EOL';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class SaveExactQueryDto {
  @String('Exact gUID')
  @IsOptional()
  @ApiProperty()
  id?: string;

  @Enum(ExactActionType, 'Type')
  @IsOptional()
  @ApiProperty()
  actionType: any;

  @Enum(ExactActionProcedure, 'Procedure')
  @IsOptional()
  @ApiProperty()
  actionProcedure?: ExactActionProcedure;
}
