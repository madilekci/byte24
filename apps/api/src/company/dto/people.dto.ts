import { NotNullable, Number, String } from '@byte24/api/dto';
import { ApiProperty } from '@nestjs/swagger';

export class PeopleDto {
  @String('firstname')
  @NotNullable('lastname')
  @ApiProperty()
  firstname: string;

  @String('firstname')
  @NotNullable('lastname')
  @ApiProperty()
  lastname: string;

  @String('email')
  @NotNullable('email')
  @ApiProperty()
  email: string;

  @String('phoneNumber')
  @NotNullable('phoneNumber')
  @ApiProperty()
  phoneNumber: string;

  @String('type')
  @NotNullable('type')
  @ApiProperty()
  type: string;

  @Number('companyId')
  @NotNullable('companyId')
  @ApiProperty()
  companyId: number;
}
