import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './post.scheme';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    HttpModule.register({ baseURL: 'https://jsonplaceholder.typicode.com/' }),
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
