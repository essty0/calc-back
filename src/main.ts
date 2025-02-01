import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
  const origins = ['http://localhost:3001', 'http://localhost:3000', 'https://car.adventourparis.com'];
  dotenv.config();
  const app = await NestFactory.create(AppModule, { cors: true  });
  app.enableCors({
    origin: origins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(5000);
}
bootstrap();
