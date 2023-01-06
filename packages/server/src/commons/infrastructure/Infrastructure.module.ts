import { Module, Provider } from '@nestjs/common';
import { MessageToken } from '../domain/enum/message-type.emum';
import { PubSubRedis } from './cache/redis.pubsub';
import { LoggerModule } from './logger/logger.module';
import { IntegrationEventPublisherImplement } from './message/integration-event.publisher';
import { NotificationModule } from './notification/notification.module';

const infrastructure: Provider[] = [
  {
    provide: MessageToken.INTEGRATION_EVENT_PUBLISHER,
    useClass: IntegrationEventPublisherImplement
  },
  {
    provide: MessageToken.INTEGRATION_EVENT_REDIS,
    useClass: PubSubRedis
  },
  LoggerModule,
  NotificationModule
];
@Module({
  imports: [LoggerModule, NotificationModule],
  providers: [...infrastructure],
  exports: [...infrastructure]
})
export class InfrastructureModule {}
