import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { TokenController } from './token.controller';
import { Token, TokenScheme } from './token.scheme';
import { TokenService } from './token.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Token.name, schema: TokenScheme }]),
    JwtModule.register({ secret: process.env.PRIVATE_KEY ?? 'SECRET' }),
  ],
  controllers: [TokenController],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
