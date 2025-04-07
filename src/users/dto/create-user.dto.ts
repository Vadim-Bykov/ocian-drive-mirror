import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { RoleEnum } from 'src/roles/role.enum';

export class CreateUserDto {
  @ApiProperty({ required: true, uniqueItems: true })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @Length(4, 12)
  password: string;

  @ApiProperty({ required: false })
  image?: string;

  roles: Array<RoleEnum>;
}
