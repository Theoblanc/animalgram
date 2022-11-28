import { RedisModuleOptions } from '@liaoliaots/nestjs-redis';
import { ConfigService } from '@nestjs/config';

export async function redisFactory(config: ConfigService): Promise<RedisModuleOptions> {
  return {
    config: [
      {
        host: config.get('REDIS_MASTER_HOST'),
        port: config.get('REDIS_MASTER_PORT')
      }
    ]
  };
}
