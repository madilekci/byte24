import { AuthConfig } from '@/config/auth/auth-config.type';
import { ThrottlerConfig } from '@/config/throttler/throttler-config.type';
import { AppConfig } from './app/app-config.type';

export type GlobalConfig = {
  app: AppConfig;
  // database: DatabaseConfig;
  // redis: RedisConfig;
  auth: AuthConfig;
  // mail: MailConfig;
  // sentry: SentryConfig;
  // queue: BullConfig;
  throttler: ThrottlerConfig;
  // grafana: GrafanaConfig;
};
