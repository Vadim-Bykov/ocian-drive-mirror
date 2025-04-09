import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { FilesService } from 'src/files/files.service';
import { TokenService } from 'src/token/token.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { getUserDto } from 'src/users/dto/user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private filesService: FilesService,
    private tokenService: TokenService,
  ) {}

  async registration(
    { email, password, roles }: CreateUserDto,
    image?: Express.Multer.File,
  ) {
    try {
      const candidate = await this.usersService.getUserByEmail(email);
      if (candidate) {
        throw new HttpException(
          `Email ${email} already exists in db`,
          HttpStatus.BAD_REQUEST,
        );
      }

      const filePath = image ? this.filesService.crateFile(image) : undefined;

      const hashPassword = await bcrypt.hash(password, 3);
      const user = await this.usersService.createUser({
        email,
        roles,
        password: hashPassword,
        image: filePath,
      });

      const payload = { email, id: user._id, roles };
      const tokens = await this.tokenService.createTokens(payload);

      return getUserDto(user, tokens);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new BadRequestException(error);
      }
    }
  }

  async login(userDto: CreateUserDto) {
    try {
      const user = await this.validateUserCredentials(userDto);
      const payload = { email: user.email, id: user._id, roles: user.roles };
      const tokens = await this.tokenService.createTokens(payload);

      return getUserDto(user, tokens);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new BadRequestException(error);
      }
    }
  }

  async logout(userId: string) {
    try {
      const user = await this.usersService.getUserById(userId);
      if (user) {
        await this.tokenService.removeRefreshToken(userId);
      } else {
        throw new UnauthorizedException('User was not found');
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new BadRequestException(error);
      }
    }
  }

  private async validateUserCredentials({ email, password }: CreateUserDto) {
    try {
      const user = await this.usersService.getUserByEmail(email);
      const passwordsEqual =
        user && (await bcrypt.compare(password, user?.password));

      if (passwordsEqual && user) {
        return user;
      }

      throw new BadRequestException({ message: 'Incorrect email or password' });
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new BadRequestException(error);
      }
    }
  }
}
