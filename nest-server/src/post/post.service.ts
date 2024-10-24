import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Post } from './entities/post.entity';
import { User } from 'src/user/entities/user.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { Comment } from 'src/comment/entities/comment.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {}

  async createPost(createPostDto: CreatePostDto, user: User): Promise<Post> {
    console.log(user);

    if (!user) {
      throw new Error('User not found');
    }
    const post = this.postRepository.create({
      ...createPostDto,
      user,
      createdAt: new Date(),
    });

    return this.postRepository.save(post);
  }

  async findAll(): Promise<Post[]> {
    return this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.comments', 'comments')
      .leftJoin('comments.user', 'commentUser')
      .leftJoin('post.user', 'postUser')
      .addSelect([
        'postUser.id',
        'postUser.access',
        'postUser.name',
        'postUser.email',
        'postUser.username',
        'commentUser.id',
        'commentUser.name',
        'commentUser.email',
      ])
      .getMany();
  }

  async findOne(id: number): Promise<Post> {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['comments', 'user'],
    });

    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    return post;
  }

  async likePost(postId: number, user: User) {
    const post = await this.findOne(postId);

    const isLiked = post.likes.some((like) => like.userId === user.id);

    if (!isLiked) {
      post.likes.push({ userId: user.id, username: user.name });
    } else {
      post.likes = post.likes.filter((like) => like.userId !== user.id);
    }

    return this.postRepository.save(post);
  }

  async addComment(id: number, user: User, text: string) {
    if (!text) {
      throw new BadRequestException('Comment text is required');
    }

    const post = await this.postRepository.findOne({ where: { id } });
    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const comment = this.commentRepository.create({
      text,
      user,
      post,
    });
    return this.commentRepository.save(comment);
  }

  async remove(id: number): Promise<void> {
    const post = await this.findOne(id);
    await this.postRepository.remove(post);
  }
}
