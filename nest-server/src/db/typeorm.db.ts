import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { User } from 'src/user/entities/user.entity';
import { Post } from 'src/post/entities/post.entity';
import { Comment } from 'src/comment/entities/comment.entity';

export const typeORM = [
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (config: ConfigService) => ({
      type: 'postgres',
      host: 'localhost',
      port: config.get('POSTGRES_PORT'),
      password: config.get('POSTGRES_PASSWORD'),
      username: config.get('POSTGRES_USERNAME'),
      database: config.get('POSTGRES_DB_NAME'),
      entities: [User, Post, Comment],
      synchronize: true,
      logging: true,
    }),
  }),
];
