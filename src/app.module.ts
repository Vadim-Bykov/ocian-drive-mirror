import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD, APP_FILTER } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';
import { TokenModule } from './token/token.module';
import { PostsModule } from './posts/posts.module';
import { SentryModule } from '@sentry/nestjs/setup';
import { SentryGlobalFilter } from '@sentry/nestjs/setup';

@Module({
  imports: [
    SentryModule.forRoot(),
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
    PostsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // To protect all the API endpoints
    { provide: APP_GUARD, useClass: AuthGuard },
    { provide: APP_FILTER, useClass: SentryGlobalFilter },
  ],
})
export class AppModule {}
