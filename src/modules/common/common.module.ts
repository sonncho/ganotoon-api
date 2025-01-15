import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { CommonController } from './common.controller';

@Module({
  imports: [TerminusModule],
  controllers: [CommonController],
})
export class CommonModule {}
