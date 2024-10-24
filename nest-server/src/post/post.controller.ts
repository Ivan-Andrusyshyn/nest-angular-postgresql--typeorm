import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  UseGuards,
} from '@nestjs/common';

import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { User } from 'src/user/entities/user.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { CurrentUser } from 'src/authorization/user.decorator';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(
    @Body() createPostDto: CreatePostDto,
    @CurrentUser() user: User,
  ) {
    console.log(user);

    return this.postService.createPost(createPostDto, user);
  }

  @Get()
  async findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.postService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id/like')
  async likePost(@Param('id') id: number, @CurrentUser() user: User) {
    return this.postService.likePost(id, user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id/comment')
  async addComment(
    @Param('id') id: number,
    @Body() commentData: Partial<Comment>,
    @CurrentUser() user: User,
  ) {
    console.log(this.postService.addComment(id, user, commentData.text));

    return this.postService.addComment(id, user, commentData.text);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.postService.remove(id);
  }
}
