import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { RoleEnum } from './role.enum';
import { HydratedDocument } from 'mongoose';

export type RoleDocument = HydratedDocument<Role>;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    versionKey: false,
    transform: (_, ret: Record<string, RoleDocument>) => {
      ret.id = ret._id;
      delete ret._id;
    },
  },
})
export class Role {
  @ApiProperty({ example: 'ADMIN', description: 'ADMIN ROLE', enum: RoleEnum })
  @Prop({ required: true, unique: true })
  value: RoleEnum;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
