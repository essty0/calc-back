import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';
import {INestApplication, ValidationPipe} from "@nestjs/common";
import { VercelRequest, VercelResponse } from '@vercel/node';

let cachedApp: INestApplication | null = null;

async function bootstrap(): Promise<INestApplication>  {
  const origins = ['http://localhost:3001', 'http://localhost:3000'];
  dotenv.config();
  const app = await NestFactory.create(AppModule, { cors: true  });
  app.enableCors({
    origin: '*',//origins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  await app.init();
  //await app.listen(5000);
  return app;
}
//bootstrap();
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!cachedApp) {
    cachedApp = await bootstrap();
  }
  const expressApp = cachedApp?.getHttpAdapter().getInstance();
  return expressApp(req, res);
}
