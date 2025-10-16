import { Boolean, NotNullable, Number, SearchDto } from '@byte24/api/dto';
import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsOptional } from 'class-validator';

export class ListCompaniesDto extends IntersectionType(SearchDto) {
  @Transform(({ value }) => value.map((id: string) => parseInt(id)))
  @Number('het type', { each: true })
  @IsArray()
  @IsOptional()
  @ApiProperty()
  typeIds: number[];

  @Transform(({ value }) => value.map((id: string) => parseInt(id)))
  @Number('de bedrijven', { each: true })
  @IsArray()
  @IsOptional()
  @ApiProperty()
  includedCompanyIds: number[];

  @Boolean('of het een klant is')
  @IsOptional()
  @Transform(({ obj, key }) => {
    const value = obj[key];
    if (typeof value === 'string') {
      return obj[key] === 'true';
    }

    return value;
  })
  @ApiProperty()
  isCustomer: boolean;

  @Boolean('of het een leverancier is')
  @IsOptional()
  @Transform(({ obj, key }) => {
    const value = obj[key];
    if (typeof value === 'string') {
      return obj[key] === 'true';
    }
  })
  @ApiProperty()
  isSupplier: boolean;
}
