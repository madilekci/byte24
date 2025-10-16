import {
  IsString,
  IsOptional,
  IsDateString,
  IsEmail,
  IsArray,
  ValidateNested,
  IsObject,
  IsDate,
  IsNumber,
} from "class-validator";
import { Type } from "class-transformer";
import { ICalAttendee, ICalAttendeeData, ICalOrganizer } from "ical-generator";

export class CancelICSFileDto {
  @IsString()
  summary: string;

  @IsNumber()
  sequence: number;
}
