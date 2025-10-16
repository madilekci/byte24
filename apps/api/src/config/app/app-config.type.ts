import { Environment } from '@/constants/app.constant';

export type AppConfig = {
  nodeEnv: `${Environment}`;
  name: string;
  url: string;
  frontendUrl: string;
  debug: boolean;
  appLogging: boolean;
  logLevel: string;
  logService: string;
};
