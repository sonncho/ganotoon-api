import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { PostType } from './entities/post-type.entity';
import { PostsController } from './controllers/posts.controller';
import { PostsService } from './services/posts.service';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { PostComment } from './entities/post-comment.entity';
import { PostCommentLike } from './entities/post-comment-like.entity';
import { PostCommentReport } from './entities/post-comment-report.entity';
import { PostCommentsService } from './services/post-comments.service';
import { PostCommentsController } from './controllers/post-comments.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Post,
      PostType,
      PostComment,
      PostCommentLike,
      PostCommentReport,
    ]),
    AuthModule,
    UsersModule,
  ],
  controllers: [PostsController, PostCommentsController],
  providers: [PostsService, PostCommentsService],
})
export class PostsModule {}
