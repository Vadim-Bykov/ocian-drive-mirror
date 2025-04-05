import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { RoleEnum } from 'src/roles/role.enum';
// import { HydratedDocument } from 'mongoose';

// export type UsersDocument = HydratedDocument<User>;

@Schema({ collection: 'users', timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: [RoleEnum.User] })
  roles: Array<RoleEnum>;
}

export const UserSchema = SchemaFactory.createForClass(User);
