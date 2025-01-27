import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const origins = ['http://localhost:3001', 'http://localhost:3000'];

  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: origins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(5000);
}
bootstrap();
