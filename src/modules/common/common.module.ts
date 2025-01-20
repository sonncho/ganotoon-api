import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { CommonController } from './common.controller';
import { RedisModule } from './redis/redis.module';
import { RedisHealthIndicator } from './redis/redis.health';

@Module({
  imports: [TerminusModule, RedisModule],
  controllers: [CommonController],
  providers: [RedisHealthIndicator],
  exports: [RedisModule],
})
export class CommonModule {}
