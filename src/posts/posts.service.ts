import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { firstValueFrom } from 'rxjs';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { PaginationResult } from 'src/common/interfaces/pagination-result.interface';
import { paginate } from 'src/common/utils/paginate';
import { CreatePostDto, JsonPlaceholderPostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './post.scheme';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<Post>,
    private readonly httpService: HttpService,
  ) {}

  async create(createPostDto: CreatePostDto) {
    try {
      const post = await this.postModel.create(createPostDto);
      return post;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findAll() {
    try {
      // const response$ = this.httpService.get<JsonPlaceholderPostDto[]>(
      //   'https://jsonplaceholder.typicode.com/posts',
      // );
      // const posts = (await firstValueFrom(response$)).data;

      const posts = await this.postModel.find().exec();
      return posts;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async getPaginatedPosts(
    paginationQuery: PaginationQueryDto,
  ): Promise<PaginationResult<Post>> {
    const paginatedPosts = await paginate<Post>(
      this.postModel,
      paginationQuery,
    );

    return paginatedPosts;
  }

  async findOne(id: string) {
    const isInteger = Number.isInteger(+id);
    console.log({
      isInteger,
      id,
      '+id': +id,
    });

    try {
      if (isInteger) {
        const response$ = this.httpService.get<JsonPlaceholderPostDto>(
          `/posts/${id}`,
        );
        const jsonPost = (await firstValueFrom(response$)).data;

        const { body, title, userId } = jsonPost;

        const post = await this.create({
          body,
          title,
          userId,
        });

        return post;
      } else {
        const postDB = await this.postModel.findById(id).exec();
        return postDB;
      }
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    // return this.httpService.put(`/posts/${id}`, updatePostDto);
    try {
      const post = await this.postModel
        .findByIdAndUpdate(id, updatePostDto, { new: true })
        .exec();
      return post;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async remove(id: string) {
    // const response$ = this.httpService.delete<Post>(`/posts/${id}`);
    // const jsonPost = (await firstValueFrom(response$)).data;
    // return jsonPost;
    try {
      const post = await this.postModel.findByIdAndDelete(id);
      return post;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
