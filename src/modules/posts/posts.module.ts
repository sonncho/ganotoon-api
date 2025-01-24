import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { PostType } from './entities/post-type.entity';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, PostType]),
    AuthModule,
    UsersModule,
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
