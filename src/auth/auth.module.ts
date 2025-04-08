import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
// import { JwtModule } from '@nestjs/jwt';
import { FilesModule } from 'src/files/files.module';
import { TokenModule } from 'src/token/token.module';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    // JwtModule.register({ secret: process.env.PRIVATE_KEY ?? 'SECRET' }),
    FilesModule,
    TokenModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [
    AuthService,
    // JwtModule
  ],
})
export class AuthModule {}
