import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { envConfig } from './config/env.config';
import { typeORM } from './db/typeorm.db';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { AuthorizationModule } from './authorization/authorization.module';
import { CommentModule } from './comment/comment.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    ...envConfig,
    ...typeORM,
    UserModule,
    PostModule,
    AuthorizationModule,
    CommentModule,
    PassportModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: Logger,
      useFactory: () => {
        const logger = new Logger('AppModule');
        return logger;
      },
    },
  ],
})
export class AppModule {}
