import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { RoleEnum } from './role.enum';
// import { HydratedDocument } from 'mongoose';

// export type UsersDocument = HydratedDocument<User>;

@Schema({ collection: 'roles', timestamps: true })
export class Role {
  @ApiProperty({ example: 'ADMIN', description: 'ADMIN ROLE', enum: RoleEnum })
  @Prop({ required: true, unique: true })
  value: RoleEnum;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
