import { Number, OrderByDto, SearchDto } from '@byte24/api/dto';
import { IntersectionType } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsOptional } from 'class-validator';
import { PaginationDto } from 'src/utils/pagination.dto';

export class AllCompanysDto extends IntersectionType(PaginationDto, SearchDto, OrderByDto) {
  @Transform(({ value }) => value.map((id: string) => parseInt(id)))
  @Number('status', { each: true })
  @IsArray()
  @IsOptional()
  @ApiProperty()
  status: number[];

  @Transform(({ value }) => value.map((id: string) => parseInt(id)))
  @Number('type', { each: true })
  @IsArray()
  @IsOptional()
  @ApiProperty()
  type: number[];
}
