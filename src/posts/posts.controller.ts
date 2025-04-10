import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from 'src/auth/auth.public.decorator';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { PaginationResult } from 'src/common/interfaces/pagination-result.interface';
import { CreatePostDto, PostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsService } from './posts.service';

const PostExample: PostDto = {
  userId: 1,
  title:
    'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
  body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
  createdAt: 'Thu Apr 10 2025 14:29:14 GMT+0200 (Central European Summer Time)',
  updatedAt: 'Thu Apr 10 2025 14:29:14 GMT+0200 (Central European Summer Time)',
  id: '67f7b99a38583ddb4c752de2',
};

const PaginatedPostExample: PaginationResult<PostDto> = {
  items: [PostExample],
  total: 45,
  page: 1,
  size: 10,
  totalPages: 5,
  nextPage: 2,
};

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @Public()
  @ApiCreatedResponse({ example: PostExample, type: PostDto })
  create(@Body() createPostDto: CreatePostDto) {
    try {
      return this.postsService.create(createPostDto);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new BadRequestException(error);
      }
    }
  }

  @Get()
  @Public()
  @ApiOkResponse({
    description: 'Paginated list of posts',
    // type: PaginationResult<PostDto>,
    example: PaginatedPostExample,
    schema: {
      type: 'object',
      properties: {
        items: {
          type: 'array',
          items: { example: [PostExample] },
        },
        total: { type: 'number', example: 45 },
        page: { type: 'number', example: 1 },
        size: { type: 'number', example: 10 },
        totalPages: { type: 'number', example: 5 },
        nextPage: { type: 'number', nullable: true, example: 2 },
      },
    },
  })
  async getPaginated(@Query() query: PaginationQueryDto) {
    return this.postsService.getPaginatedPosts(query);
  }

  @Get(':id')
  @Public()
  @ApiOkResponse({ example: PostExample, type: PostDto })
  findOne(@Param('id') id: string) {
    try {
      return this.postsService.findOne(id);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new BadRequestException(error);
      }
    }
  }

  @Patch(':id')
  @Public()
  @ApiResponse({ example: PostExample, status: 201 })
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    try {
      return this.postsService.update(id, updatePostDto);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new BadRequestException(error);
      }
    }
  }

  @Delete(':id')
  @Public()
  remove(@Param('id') id: string) {
    try {
      return this.postsService.remove(id);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new BadRequestException(error);
      }
    }
  }
}
