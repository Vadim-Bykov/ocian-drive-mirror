import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiAcceptedResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { UserDto } from 'src/users/dto/user.dto';
import { UserExample } from 'src/users/users.controller';
import { Public } from './auth.public.decorator';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/login')
  @ApiAcceptedResponse({
    type: UserDto,
    example: UserExample,
  })
  async login(@Body() userDtoDto: CreateUserDto) {
    const token = await this.authService.login(userDtoDto);
    return token;
  }

  @Public()
  @Post('/registration')
  @ApiCreatedResponse({
    type: UserDto,
    example: UserExample,
  })
  registration(@Body() userDtoDto: CreateUserDto) {
    return this.authService.registration(userDtoDto);
  }
}
