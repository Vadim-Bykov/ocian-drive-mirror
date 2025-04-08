import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';
import { TokenModule } from './token/token.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DB_URL ?? ''),
    UsersModule,
    RolesModule,
    AuthModule,
    FilesModule,
    ServeStaticModule.forRoot({
      rootPath: resolve('static'),
      serveStaticOptions: {
        fallthrough: false,
      },
    }),
    TokenModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // To protect all the API endpoints
    { provide: APP_GUARD, useClass: AuthGuard },
  ],
})
export class AppModule {}
