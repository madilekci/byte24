import { NotNullable, String } from '@byte24/api/dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsOptional, ValidateIf } from 'class-validator';

export class UpdateContactPersonDto {
  @String('Functie')
  @NotNullable('functie')
  @ApiProperty()
  title: string;

  @IsEmail({}, { message: 'Dit is geen geldig email adres.' })
  @String('Email')
  @IsOptional()
  @ValidateIf((obj) => obj.email !== '')
  @ApiProperty()
  email?: string;

  @String('Telefoonnummer')
  @IsOptional()
  @ApiProperty()
  phone?: string;

  @String('De voorletters')
  @NotNullable('de voorletters')
  @ApiProperty()
  initials: string;

  @String('De tussenvoegsels')
  @IsOptional()
  @ApiProperty()
  infix?: string;

  @String('De achternaam')
  @NotNullable('de achternaam')
  @ApiProperty()
  lastName: string;

  @String('De roepnaam')
  @IsOptional()
  @ApiProperty()
  preferredName?: string;

  @IsBoolean()
  @NotNullable('hoofdcontactpersoon')
  @ApiProperty()
  isMainContactPerson: boolean;
}
