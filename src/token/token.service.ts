import {
  BadRequestException,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateTokenDto, SaveTokenDto } from './dto/create-token.dto';
import { Token } from './token.scheme';

@Injectable()
export class TokenService {
  constructor(
    @InjectModel(Token.name) private tokenModel: Model<Token>,
    private jwtService: JwtService,
  ) {}

  async createTokens(payload: CreateTokenDto) {
    const { accessToken, refreshToken } = this.generateTokens(payload);

    await this.saveRefreshToken({ user: payload.id, refreshToken });

    return { accessToken, refreshToken };
  }

  async refreshToken(refreshToken: string) {
    try {
      const tokenPayload = this.verifyToken(refreshToken);
      const { id, email, roles } = tokenPayload;

      const { accessToken, refreshToken: newRefreshToken } =
        this.generateTokens({ email, id, roles });

      const tokenData = await this.tokenModel.findOne({ refreshToken }).exec();
      if (tokenData) {
        tokenData.refreshToken = newRefreshToken;
        await tokenData.save();
      } else {
        throw new UnauthorizedException('Existing refresh token was not found');
      }

      return { accessToken, newRefreshToken };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new UnauthorizedException('Token is invalid');
      }
    }
  }

  async removeRefreshToken(userId: string) {
    try {
      const deletedTokenData = await this.tokenModel
        .findOneAndDelete({
          user: new Types.ObjectId(userId),
        })
        .exec();

      if (!deletedTokenData) {
        throw new UnauthorizedException('Existing refresh token was not found');
      }

      return deletedTokenData.refreshToken;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  verifyToken(token: string) {
    const payload = this.jwtService.verify<CreateTokenDto>(token, {
      secret: process.env.PRIVATE_KEY ?? 'SECRET',
    });

    return payload;
  }

  private async saveRefreshToken({ user, refreshToken }: SaveTokenDto) {
    try {
      let newRefreshToken: string | undefined;
      const existingTokenData = await this.tokenModel.findOne({ user }).exec();
      if (existingTokenData) {
        existingTokenData.refreshToken = refreshToken;
        newRefreshToken = (await existingTokenData.save()).refreshToken;
      } else {
        newRefreshToken = (await this.tokenModel.create({ user, refreshToken }))
          .refreshToken;
      }

      return newRefreshToken;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new BadRequestException(error);
      }
    }
  }

  private generateTokens(payload: CreateTokenDto) {
    const accessToken = this.jwtService.sign(payload, { expiresIn: '24h' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '180d' });

    return { accessToken, refreshToken };
  }
}
