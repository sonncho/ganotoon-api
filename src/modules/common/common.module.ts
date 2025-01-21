import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { CommonController } from './common.controller';
import { RedisModule } from './redis/redis.module';
import { RedisHealthIndicator } from './redis/redis.health';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [TerminusModule, RedisModule, MailModule],
  controllers: [CommonController],
  providers: [RedisHealthIndicator],
  exports: [RedisModule, MailModule],
})
export class CommonModule {}
