import { Number, String } from "@byte24/api/dto";
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class ContactPersonDto {
  @Number("id")
  @IsOptional()
  @ApiProperty()
  id?: number;

  @String("aanspreektitel")
  @IsOptional()
  @ApiProperty({ required: false })
  title?: string; // e.g., "De Heer", "Mevrouw"

  @String("voornaam")
  @IsOptional()
  @ApiProperty()
  firstName?: string;

  @String("tussenvoegsel")
  @IsOptional()
  @ApiProperty({ required: false })
  middleName?: string;

  @String("achternaam")
  @IsOptional()
  @ApiProperty()
  lastName?: string;

  @String("functie")
  @IsOptional()
  @ApiProperty({ required: false })
  jobTitle?: string;

  @String("afdeling")
  @IsOptional()
  @ApiProperty({ required: false })
  department?: string;

  //@IsEmail({}, { message: "Dit is geen geldig e-mailadres." })
  @String("email")
  @IsOptional()
  @ApiProperty({ required: false })
  email?: string;

  @String("telefoon zakelijk")
  @IsOptional()
  @ApiProperty({ required: false })
  phoneBusiness?: string;

  @String("telefoon mobiel")
  @IsOptional()
  @ApiProperty({ required: false })
  phoneMobile?: string;
}
