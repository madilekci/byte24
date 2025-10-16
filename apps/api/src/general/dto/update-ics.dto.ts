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
  
  export class UpdateICSFileDto {
    @IsString()
    summary: string;
  
    @IsOptional()
    @IsString()
    description?: string;
  
    @IsOptional()
    @IsString()
    location?: string;
  
    @IsOptional()
    @IsString()
    url?: string;
  
    @IsDate()
    start: Date;
  
    @IsDate()
    end: Date;
  
    organizer?: ICalOrganizer;
  
    attendees?: ICalAttendeeData[];

    @IsNumber()
    sequence: number;
  }
  