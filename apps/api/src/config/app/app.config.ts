import { Environment, LogService } from '@/constants/app.constant';
import validateConfig from '@/utils/validate-config';
import { registerAs } from '@nestjs/config';
import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';
import process from 'node:process';
import { AppConfig } from './app-config.type';

class EnvironmentVariablesValidator {
  @IsEnum(Environment)
  @IsOptional()
  NODE_ENV: typeof Environment;

  @IsString()
  @IsNotEmpty()
  APP_NAME: string;

  @IsUrl({ require_tld: false })
  @IsNotEmpty()
  BACKEND_URL: string;

  @IsUrl({ require_tld: false })
  @IsNotEmpty()
  FRONTEND_URL: string;

  @IsBoolean()
  @IsOptional()
  APP_DEBUG: boolean;

  @IsBoolean()
  @IsOptional()
  APP_LOGGING: boolean;

  @IsString()
  @IsOptional()
  APP_LOG_LEVEL: string;

  @IsString()
  @IsEnum(LogService)
  @IsOptional()
  APP_LOG_SERVICE: string;
}

export function getConfig(): AppConfig {
  const port = parseInt(process.env.APP_PORT, 10);

  return {
    nodeEnv: (process.env.NODE_ENV || Environment.Development) as Environment,
    name: process.env.APP_NAME,
    url: process.env.APP_URL || `http://localhost:${port}`,
    frontendUrl: process.env.FRONTEND_URL || `http://localhost:3000`,
    debug: process.env.APP_DEBUG === 'true',
    appLogging: process.env.APP_LOGGING === 'true',
    logLevel: process.env.APP_LOG_LEVEL || 'warn',
    logService: process.env.APP_LOG_SERVICE || LogService.Console,
  };
}

export default registerAs<AppConfig>('app', () => {
  // eslint-disable-next-line no-console
  console.info(`Registering AppConfig from environment variables`);
  validateConfig(process.env, EnvironmentVariablesValidator);
  return getConfig();
});
