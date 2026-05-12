import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  /* eslint-disable @typescript-eslint/no-unsafe-call */
  app.use(cookieParser());
  /* eslint-enable @typescript-eslint/no-unsafe-call */

  // 🧾 config Swagger
  const config = new DocumentBuilder()
    .setTitle('Reserve a Space API')
    .setDescription('API de reservas')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000, '0.0.0.0');
}
void bootstrap();
