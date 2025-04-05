import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
import { RoleEnum } from 'src/roles/role.enum';

export class UserDto {
  @ApiProperty({ required: true, uniqueItems: true })
  _id: string;

  @IsEmail()
  @ApiProperty({ required: true, uniqueItems: true })
  email: string;

  @ApiProperty({ required: true })
  password: string;

  @ApiProperty({ required: false, enum: RoleEnum, isArray: true })
  roles: Array<RoleEnum>;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updatedAt: string;
}
