import { NotNullable, String } from '@byte24/api/dto';
import { ApiProperty } from '@nestjs/swagger';

export class AddCompanyContractDto {
  @String('verloopdatum')
  @NotNullable('verloopdatum')
  @ApiProperty()
  expireDate: string;
}
