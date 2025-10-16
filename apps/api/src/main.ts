import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
import { setupGracefulShutdown } from 'nestjs-graceful-shutdown';
import { AppModule } from './app.module';
import { GlobalConfig } from './config/config.type';
import { AllExceptionsFilter } from './exception-filter';

BigInt.prototype.toJSON = function () {
  const int = Number.parseInt(this.toString());

  return int ?? this.toString();
};

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bodyParser: false,
  });
  const configService = app.get(ConfigService<GlobalConfig>);
  const env = configService.getOrThrow('app.nodeEnv', { infer: true });

  // app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  app.use(helmet());
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:3002',
      /\.byte24\.app$/,
      /\.staging\.byte24\.app$/,
      /\.vercel\.app$/,
    ],
    credentials: true,
    optionsSuccessStatus: 200,
  });
  if (env !== 'development') {
    setupGracefulShutdown({ app });
  }
  app.set('query parser', 'extended');
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      stopAtFirstError: true,
      transformOptions: { enableImplicitConversion: true },
    })
  );

  await app.listen(8080);
}
bootstrap();
