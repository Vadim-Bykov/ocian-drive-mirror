import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { getUserDto } from 'src/users/dto/user.dto';
import { UserDocument } from 'src/users/user.schema';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: CreateUserDto) {
    const user = await this.validateToken(userDto);
    const token = this.generateToken(user);

    return getUserDto(user, token);
  }

  async registration({ email, password, roles }: CreateUserDto) {
    try {
      const candidate = await this.usersService.getUserByEmail(email);
      if (candidate) {
        throw new HttpException(
          `Email ${email} already exists in db`,
          HttpStatus.BAD_REQUEST,
        );
      }

      const hashPassword = await bcrypt.hash(password, 3);
      const user = await this.usersService.createUser({
        email,
        roles,
        password: hashPassword,
      });

      const token = this.generateToken(user);

      return getUserDto(user, token);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  private generateToken({ email, _id, roles }: UserDocument) {
    const payload = { email, id: _id, roles };
    return this.jwtService.sign(payload);
  }

  private async validateToken({ email, password }: CreateUserDto) {
    try {
      const user = await this.usersService.getUserByEmail(email);

      const passwordsEqual =
        user && (await bcrypt.compare(password, user?.password));

      if (passwordsEqual && user) {
        return user;
      }

      throw new BadRequestException({ message: 'Incorrect email or password' });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
