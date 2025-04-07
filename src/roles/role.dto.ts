import { ApiProperty, OmitType } from '@nestjs/swagger';
import { RoleEnum } from './role.enum';

export class RoleDto {
  @ApiProperty({ required: true, uniqueItems: true })
  id: string;

  @ApiProperty({ required: true, enum: RoleEnum })
  value: RoleEnum;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updatedAt: string;
}

export class CreateRoleDto extends OmitType(RoleDto, ['id']) {}
