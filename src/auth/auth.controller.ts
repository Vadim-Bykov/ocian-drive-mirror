import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
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
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/registration')
  @Public()
  @ApiCreatedResponse({
    type: UserDto,
    example: UserExample,
  })
  @UseInterceptors(FileInterceptor('image'))
  async registration(
    @Body() userDto: CreateUserDto,
    @UploadedFile() image?: Express.Multer.File,
  ) {
    try {
      const user = await this.authService.registration(userDto, image);
      return user;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Post('/login')
  @Public()
  @ApiAcceptedResponse({
    type: UserDto,
    example: UserExample,
  })
  async login(@Body() userDtoDto: CreateUserDto) {
    const token = await this.authService.login(userDtoDto);
    return token;
  }

  @Delete('/logout/:userId')
  async logout(@Param('userId') userId: string) {
    await this.authService.logout(userId);
  }
}
