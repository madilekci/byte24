import { IsBoolean, IsObject, IsOptional, IsString } from 'class-validator';

export class CreateViewDto {
  @IsString()
  name: string;

  @IsString()
  params: string;

  @IsObject()
  @IsOptional()
  columnPreferences?: {
    order?: string[];
    visibility?: Record<string, boolean>;
  };

  @IsBoolean()
  @IsOptional()
  isShared?: boolean;
}
