import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
import 'dotenv/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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

    fs.writeFileSync('./swagger.json', JSON.stringify(document, null, 2));
    console.log('✅ Swagger JSON обновлен!');

    SwaggerModule.setup('api', app, document);
    await app.listen(process.env.PORT ?? 3000);

    console.log('CONNECTED PORT: ', process.env.PORT);
  } catch (error) {
    console.error(error);
  }
}
bootstrap();
