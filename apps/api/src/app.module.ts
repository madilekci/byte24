import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { SentryGlobalFilter, SentryModule } from '@sentry/nestjs/setup';
import { WinstonModule } from 'nest-winston';
import { GracefulShutdownModule } from 'nestjs-graceful-shutdown';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CompanyModule } from './company/company.module';
import appConfig from './config/app/app.config';
import authConfig from './config/auth/auth.config';
import { loggerConfig } from './config/logger.config';
import throttlerConfig from './config/throttler/throttler.config';
import { ContactPersonModule } from './contact-person/contact-person.module';
import { GeneralModule } from './general/general.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [authConfig, throttlerConfig, appConfig],
      envFilePath: ['.env'],
    }),
    WinstonModule.forRoot({
      ...loggerConfig,
    }),
    GracefulShutdownModule.forRoot({
      cleanup: (...args) => {
        // eslint-disable-next-line no-console
        console.log('App shutting down...', args);
      },
    }),
    SentryModule.forRoot(),
    AuthModule.forRoot({
      disableTrustedOriginsCors: true,
    }),
    EventEmitterModule.forRoot(),
    PrismaModule,
    UserModule,

    ScheduleModule.forRoot(),

    GeneralModule,
    CompanyModule,
    ContactPersonModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: SentryGlobalFilter,
    },

    AppService,
  ],
})
export class AppModule {}
