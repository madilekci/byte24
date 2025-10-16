import { Email, Min, NotNullable, String } from '@byte24/api/dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @String('De email')
  @NotNullable('de email')
  @Email('De email')
  @ApiProperty()
  email: string;

  @String('De voornaam')
  @NotNullable('de voornaam')
  @Min(2, 'De voornaam')
  @ApiProperty()
  firstName: string;

  @String('De achternaam')
  @NotNullable('de achternaam')
  @Min(2, 'De achternaam')
  @ApiProperty()
  lastName: string;

  @String('De kleur')
  @NotNullable('de kleur')
  @ApiProperty()
  color: string;
}
