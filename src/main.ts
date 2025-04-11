import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
import 'dotenv/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import './instrument';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

    // Swagger конфигурация
    const config = new DocumentBuilder()
      .setTitle('API Documentation')
      .setDescription('Generated Swagger JSON')
      .setVersion('1.0')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
        'access-token',
      )
      .build();

    const document = SwaggerModule.createDocument(app, config);
    // 👇 Добавляем auth ко всем операциям вручную
    for (const path of Object.keys(document.paths)) {
      const methods = document.paths[path];
      for (const method of Object.keys(methods)) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const operation = methods[method];
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        operation.security = [{ 'access-token': [] }];
      }
    }

    if (process.env.NODE_ENV !== 'production') {
      fs.writeFileSync('./swagger.json', JSON.stringify(document, null, 2));
    }

    SwaggerModule.setup('api', app, document);

    app.useGlobalPipes(
      new ValidationPipe({
        transform: true, // преобразует типы (например, string в number)
        whitelist: true, // игнорирует лишние поля
        // forbidNonWhitelisted: true, // ругается на лишние поля
      }),
    );

    await app.listen(process.env.PORT ?? 3000);

    console.log('CONNECTED PORT: ', process.env.PORT);
  } catch (error) {
    console.error(error);
  }
}
bootstrap();
