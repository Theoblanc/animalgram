import { RedisService } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { IntegrationEventPublisher } from 'src/commons/domain/integration.interface';

@Injectable()
export class PubSubRedis implements IntegrationEventPublisher {
  readonly redisPubSub: RedisPubSub;

  constructor(private readonly redis: RedisService) {
    this.redisPubSub = new RedisPubSub({
      publisher: this.redis.getClient('PUBLISHER_REDIS_NAMESPACE'),
      subscriber: this.redis.getClient('SUBSCRIBER_REDIS_NAMESPACE')
    });
  }

  async publish(trigger: string, payload: Record<string, string>): Promise<void> {
    return this.redisPubSub.publish(trigger, payload);
  }

  asyncIterator<T>(triggers: string | string[]): AsyncIterator<T, any, undefined> {
    return this.redisPubSub.asyncIterator(triggers);
  }
}
