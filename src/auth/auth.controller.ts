import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() userDtoDto: CreateUserDto) {
    const token = await this.authService.login(userDtoDto);
    return token;
  }

  @Post('/registration')
  registration(@Body() userDtoDto: CreateUserDto) {
    return this.authService.registration(userDtoDto);
  }
}
