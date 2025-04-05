import { ApiProperty, OmitType } from '@nestjs/swagger';
import { RoleEnum } from './role.enum';
import { ObjectId } from 'mongoose';

export class RoleDto {
  @ApiProperty({ required: true, uniqueItems: true })
  _id: ObjectId;

  @ApiProperty({ required: true, enum: RoleEnum })
  value: RoleEnum;
}

export class CreateRoleDto extends OmitType(RoleDto, ['_id']) {}
