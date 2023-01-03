import { ConfigService } from '@nestjs/config';
import { BullModuleOptions } from '@nestjs/bull';

export async function bullFactory(config: ConfigService): Promise<BullModuleOptions> {
  return {
    redis: {
      host: config.get('REDIS_HOST'),
      port: config.get('REDIS_PORT')
    }
  };
}
