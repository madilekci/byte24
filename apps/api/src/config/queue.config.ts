import { BullModule } from '@nestjs/bullmq';

export const redisConnectionConfig = {
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT) || 6379,
  db: Number(process.env.REDIS_DB) || 0,
  password: process.env.REDIS_PASSWORD,
};

export const queueConfig = BullModule.forRoot({
  connection: redisConnectionConfig,
  defaultJobOptions: {
    removeOnComplete: 1000,
    removeOnFail: 5000,
    attempts: 3,
  },
});
