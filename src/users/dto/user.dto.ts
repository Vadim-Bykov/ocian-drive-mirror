import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
import { RoleEnum } from 'src/roles/role.enum';
import { UserDocument } from '../user.schema';

export class UserDto {
  @ApiProperty({ required: true, uniqueItems: true })
  id: string;

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

export const getUserDto = ({
  id,
  email,
  roles,
  createdAt,
  updatedAt,
}: UserDocument): Omit<UserDto, 'password'> => {
  return { id: id as string, email, roles, createdAt, updatedAt };
};
