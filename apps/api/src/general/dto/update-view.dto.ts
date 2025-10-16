import { IsBoolean, IsObject, IsOptional, IsString } from 'class-validator';

export class UpdateViewDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  params: string;

  @IsObject()
  @IsOptional()
  columnPreferences?: {
    order?: string[];
    visibility?: Record<string, boolean>;
    sizing?: Record<string, number>;
  };

  @IsBoolean()
  @IsOptional()
  isShared?: boolean;

  @IsBoolean()
  @IsOptional()
  defaultView?: boolean;
}
