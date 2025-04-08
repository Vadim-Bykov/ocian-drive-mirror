import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { RoleEnum } from 'src/roles/role.enum';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    versionKey: false,
    transform: (_, ret: Record<string, UserDocument>) => {
      ret.id = ret._id;
      delete ret._id;
    },
  },
})
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, default: false })
  isActivated: boolean;

  @Prop({ default: [RoleEnum.User] })
  roles: Array<RoleEnum>;

  @Prop({ required: false })
  image: string;

  @Prop()
  createdAt: string;

  @Prop()
  updatedAt: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
