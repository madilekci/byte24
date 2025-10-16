import { Number, OrderByDto, SearchDto } from '@byte24/api/dto';
import { IntersectionType } from '@nestjs/swagger';

import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { PaginationDto } from 'src/utils/pagination.dto';

export class AllContactPersonsDto extends IntersectionType(PaginationDto, SearchDto, OrderByDto) {
  @Number('bedrijf')
  @IsOptional()
  @ApiProperty()
  companyId?: number;
}
