import { Module, Provider } from '@nestjs/common';
import { MESSAGE_TYPE } from '../domain/enum/message-type.emum';
import { PubSubRedis } from './cache/redis.pubsub';
import { IntegrationEventPublisherImplement } from './message/integration-event.publisher';

const infrastructure: Provider[] = [
  {
    provide: MESSAGE_TYPE.INTEGRATION_EVENT_PUBLISHER,
    useClass: IntegrationEventPublisherImplement
  },
  {
    provide: MESSAGE_TYPE.INTEGRATION_EVENT_REDIS,
    useClass: PubSubRedis
  }
];
@Module({
  providers: [...infrastructure],
  exports: [...infrastructure]
})
export class InfrastructureModule {}
