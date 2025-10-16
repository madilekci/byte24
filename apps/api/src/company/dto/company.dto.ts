import { Boolean, NotNullable, Number, String } from '@byte24/api/dto';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsOptional, ValidateNested } from 'class-validator';
import { ContactPersonDto } from './contact-person.dto';

export class CompanyDto {
  @String('Bedrijfsnaam moet een tekst zijn')
  @NotNullable('Bedrijfsnaam is verplicht')
  @ApiProperty()
  name: string;

  @Number('Land moet een nummer zijn')
  @IsOptional()
  @ApiProperty()
  countryId: number;

  @Number('Status moet een nummer zijn')
  @NotNullable('Status is verplicht')
  @ApiProperty()
  statusId: number;

  @Number('Type moet een nummer zijn')
  @NotNullable('Type is verplicht')
  @ApiProperty()
  typeId: number;

  @String('Email moet een tekst zijn')
  @NotNullable('Email is verplicht')
  @ApiProperty()
  email: string;

  @String('Telefoonnummer moet een tekst zijn')
  @IsOptional()
  @ApiProperty()
  phone: string;

  @String('Website moet een tekst zijn')
  @IsOptional()
  @ApiProperty()
  website: string;

  @String('Straat moet een tekst zijn')
  @IsOptional()
  @ApiProperty()
  street?: string;

  @String('Huisnummer moet een tekst zijn')
  @IsOptional()
  @ApiProperty()
  houseNumber?: string;

  @String('Postcode moet een tekst zijn')
  @IsOptional()
  @ApiProperty()
  zipCode?: string;

  @String('Plaats moet een tekst zijn')
  @IsOptional()
  @ApiProperty()
  city?: string;

  @String('BTW nummer moet een tekst zijn')
  @IsOptional()
  @ApiProperty()
  vatNumber?: string;

  @String('KvK nummer moet een tekst zijn')
  @IsOptional()
  @ApiProperty()
  cocNumber?: string;

  @String('IBAN moet een tekst zijn')
  @IsOptional()
  @ApiProperty()
  iban?: string;

  @Number('Betalingstermijn moet een nummer zijn')
  @NotNullable('Betalingstermijn')
  @ApiProperty()
  paymentDays?: number;

  @String('Factuur email moet een tekst zijn')
  @IsOptional()
  @ApiProperty()
  invoiceEmail?: string;

  @String('Factuur straat moet een tekst zijn')
  @IsOptional()
  @ApiProperty()
  invoiceStreet?: string;

  @String('Factuur huisnummer moet een tekst zijn')
  @IsOptional()
  @ApiProperty()
  invoiceHouseNumber?: string;

  @String('Factuur postcode moet een tekst zijn')
  @IsOptional()
  @ApiProperty()
  invoiceZipCode?: string;

  @String('Factuur plaats moet een tekst zijn')
  @IsOptional()
  @ApiProperty()
  invoiceCity?: string;

  @Number('Factuur land moet een nummer zijn')
  @IsOptional()
  @ApiProperty()
  invoiceCountryId?: number;

  @IsArray()
  @ValidateNested({ each: true, message: 'Contactpersoon' })
  @Type(() => ContactPersonDto)
  @IsOptional()
  @ApiProperty()
  contactPersons?: ContactPersonDto[];

  @Boolean('mileutoeslag')
  @IsOptional()
  @ApiProperty()
  environmentalCharge?: boolean;

  @Number('BTW type')
  @IsOptional()
  @ApiProperty()
  vatCodeId: number;

  @Number('Prijslijst')
  @IsOptional()
  @ApiProperty()
  pricelistId: number;
}
