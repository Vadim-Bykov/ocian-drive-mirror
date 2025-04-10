import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PostDocument = HydratedDocument<Post>;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    versionKey: false,
    transform: (_, ret: Record<string, PostDocument>) => {
      ret.id = ret._id;
      delete ret._id;
    },
  },
})
export class Post {
  @Prop({ required: true })
  userId: number;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  body: string;

  @Prop()
  createdAt: string;

  @Prop()
  updatedAt: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
