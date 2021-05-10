import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import * as cors from 'cors';
import { ValidationPipe } from '@nestjs/common';
import { api } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(helmet());
  app.use(
    cors({
      origin: '*',
      optionsSuccessStatus: 200,
    }),
  );
  await app.listen(api.PORT);
}
bootstrap();
