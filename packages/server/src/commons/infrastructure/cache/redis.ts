import { RedisModuleOptions } from "@nestjs-modules/ioredis";
import { ConfigService } from "@nestjs/config";

type RedisConfig = {

}

export async function redisFactory(config: ConfigService): Promise<RedisModuleOptions> {
  return {
    config: {
      url: config.get("REDIS_URL")
    }
  };
}
