import { NotNullable, Number } from '@byte24/api/dto';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
export class PaginationDto {
  @Transform(({ value }) => parseInt(value))
  @Number('De pagina nummer')
  @NotNullable('de pagina nummer')
  @ApiProperty()
  pageNumber: number;

  @Transform(({ value }) => parseInt(value))
  @Number('Het aantal records per pagina')
  @NotNullable('het aantal records per pagina')
  @ApiProperty()
  paginationPerPage: number;
}
