import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type TokenDocument = HydratedDocument<Token>;

export interface Tokens {
  accessToken?: string;
  refreshToken?: string;
}
@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    versionKey: false,
    transform: (_, ret: Record<string, TokenDocument>) => {
      ret.id = ret._id;
      delete ret._id;
    },
  },
})
export class Token {
  @Prop({ required: true, unique: true, ref: 'User' })
  user: Types.ObjectId;

  @Prop({ required: true, unique: true })
  refreshToken: string;
}

export const TokenScheme = SchemaFactory.createForClass(Token);
