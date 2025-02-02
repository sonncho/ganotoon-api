import { RedisService } from '@/modules/common/redis/redis.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Redis } from 'ioredis';
import { JwtPayload } from '../types/tokens.type';

@Injectable()
export class TokenBlacklistService {
  private readonly prefix = 'token:blacklist';
  private readonly redis: Redis;

  constructor(
    private redisService: RedisService,
    private jwtService: JwtService,
  ) {
    this.redis = this.redisService.getClient();
  }

  async addToBlacklist(token: string): Promise<void> {
    const decoded = this.jwtService.verify(token) as JwtPayload;
    if (!decoded || !decoded['exp']) {
      throw new Error('Invalid token structure');
    }

    const ttl = decoded['exp'] - Math.floor(Date.now() / 1000);
    if (ttl <= 0) {
      throw new Error('Token has already expired');
    }

    await this.redis.set(`${this.prefix}:${token}`, '1', 'EX', ttl);
  }

  async isBlacklisted(token: string): Promise<boolean> {
    try {
      const exists = await this.redis.exists(`${this.prefix}:${token}`);
      return exists === 1;
    } catch (error) {
      console.log(error);
      throw new Error('Failed to check token blacklist');
    }
  }
}
