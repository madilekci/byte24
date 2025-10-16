import { Boolean, NotNullable, String } from '@byte24/api/dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class ContactPersonDto {
  @Boolean('Hoofdcontactpersoon moet een boolean zijn')
  @NotNullable('Hoofdcontactpersoon is verplicht')
  @ApiProperty()
  isMainContactPerson: boolean;

  @String('Tussenvoegsel moet een tekst zijn')
  @IsOptional()
  @ApiProperty()
  infix?: string;

  @String('Initialen moet een tekst zijn')
  @NotNullable('Initialen is verplicht')
  @ApiProperty()
  initials: string;

  @String('Achternaam moet een tekst zijn')
  @NotNullable('Achternaam is verplicht')
  @ApiProperty()
  lastName: string;

  @String('Voorkeursnaam moet een tekst zijn')
  @IsOptional()
  @ApiProperty()
  preferredName?: string;

  @String('Telefoonnummer moet een tekst zijn')
  @IsOptional()
  @ApiProperty()
  phone?: string;

  @String('Titel moet een tekst zijn')
  @IsOptional()
  @ApiProperty()
  title?: string;

  @String('Email moet een tekst zijn')
  @IsOptional()
  @ApiProperty()
  email: string;
}
