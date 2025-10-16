import { Boolean, NotNullable, Number, String } from '@byte24/api/dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional } from 'class-validator';

export class UpdateCompanyDto {
  @String('name')
  @NotNullable('name')
  @ApiProperty()
  name: string;

  @Number('country')
  @IsOptional()
  @ApiProperty()
  countryId?: number;

  @String('street')
  @IsOptional()
  @ApiProperty()
  street?: string;

  @String('houseNumber')
  @IsOptional()
  @ApiProperty()
  houseNumber?: string;

  @String('zipCode')
  @IsOptional()
  @ApiProperty()
  zipCode?: string;

  @String('city')
  @IsOptional()
  @ApiProperty()
  city?: string;

  @String('postalCode')
  @IsOptional()
  @ApiProperty()
  postalCode?: string;

  @String('email')
  @IsOptional()
  @ApiProperty()
  email?: string;

  @String('phone')
  @IsOptional()
  @ApiProperty()
  phone?: string;

  @String('website')
  @IsOptional()
  @ApiProperty()
  website?: string;

  @String('remarks')
  @IsOptional()
  @ApiProperty()
  remarks?: string;

  @Boolean('solvencyApproved')
  @IsOptional()
  @ApiProperty()
  solvencyApproved?: boolean;

  @Boolean('insuranceApproved')
  @IsOptional()
  @ApiProperty()
  insuranceApproved?: boolean;

  @String('vatNumber')
  @IsOptional()
  @ApiProperty()
  vatNumber?: string;

  @String('cocNumber')
  @IsOptional()
  @ApiProperty()
  cocNumber?: string;

  @String('iban')
  @IsOptional()
  @ApiProperty()
  iban?: string;

  @Number('kvkNumber')
  @IsOptional()
  @ApiProperty()
  kvkNumber?: number;

  @Number('branchNumber')
  @IsOptional()
  @ApiProperty()
  branchNumber?: number;

  @Number('paymentTerm')
  @IsOptional()
  @ApiProperty()
  paymentTerm?: number;

  @String('invoiceEmail')
  @IsOptional()
  @ApiProperty()
  invoiceEmail?: string;

  @String('invoiceStreet')
  @IsOptional()
  @ApiProperty()
  invoiceStreet?: string;

  @String('invoiceHouseNumber')
  @IsOptional()
  @ApiProperty()
  invoiceHouseNumber?: string;

  @String('invoiceZipCode')
  @IsOptional()
  @ApiProperty()
  invoiceZipCode?: string;

  @String('invoiceCity')
  @IsOptional()
  @ApiProperty()
  invoiceCity?: string;

  @Number('invoiceCountry')
  @IsOptional()
  @ApiProperty()
  invoiceCountryId?: number;

  @Number('status')
  @IsOptional()
  @ApiProperty()
  statusId?: number;

  @Number('type')
  @IsOptional()
  @ApiProperty()
  typeId?: number;

  @IsOptional()
  @IsArray()
  @ApiProperty()
  tags?: Array<{
    tagId: number;
  }>;
}
