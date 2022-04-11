import { Module } from '@nestjs/common';
import { RedisStore } from './infrastructure/cache/redis';

@Module({
  providers: [RedisStore],
})
export class CommonModule {}
