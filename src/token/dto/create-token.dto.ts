import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

export class CreateTokenDto {
  id: Types.ObjectId;
  email: CreateUserDto['email'];
  roles: CreateUserDto['roles'];
}

export class SaveTokenDto {
  user: Types.ObjectId;
  refreshToken: string;
}

export class RefreshTokenDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  token: string;
}
