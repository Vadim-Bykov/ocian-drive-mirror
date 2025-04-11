import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({ required: true })
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  body: string;
}
export class JsonPlaceholderPostDto {
  @ApiProperty({ required: true })
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({ required: true })
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  body: string;
}

export class PostDto extends CreatePostDto {
  @ApiProperty({ required: true })
  id: string;

  @ApiProperty({ required: true })
  createdAt: string;

  @ApiProperty({ required: true })
  updatedAt: string;
}
