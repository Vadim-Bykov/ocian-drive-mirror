import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
import 'dotenv/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AuthGuard } from './auth/auth.guard';

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
