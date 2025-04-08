import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
// import { RoleEnum } from 'src/roles/role.enum';
import { UserDocument } from '../user.schema';
import { Tokens } from 'src/token/token.scheme';

export class UserDto {
  @ApiProperty({ required: true, uniqueItems: true })
  id: string;

  @IsEmail()
  @ApiProperty({
    required: true,
    uniqueItems: true,
    example: 'test-user@mail.com',
  })
  email: string;

  @ApiProperty({ required: true })
  password: string;

  // @ApiProperty({ required: false, enum: RoleEnum, isArray: true })
  // roles: Array<RoleEnum>;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updatedAt: string;

  @ApiProperty({ required: false })
  tokens?: Tokens;

  @ApiProperty({ required: false })
  isActivated?: boolean;

  @ApiProperty({ required: false })
  image?: string;
}

export const getUserDto = (
  { id, email, createdAt, updatedAt, image, isActivated }: UserDocument,
  tokens?: Tokens,
): Omit<UserDto, 'password'> => {
  return {
    id: id as string,
    email,
    createdAt,
    updatedAt,
    tokens,
    image,
    isActivated,
  };
};
