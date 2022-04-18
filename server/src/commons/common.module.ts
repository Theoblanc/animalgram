import { Module, Provider } from '@nestjs/common';
import { EventStoreImplement } from './infrastructure/cache/redis';
import { IntegrationEventPublisherImplement } from './infrastructure/messgae/integration-event.publisher';

const infrastructure: Provider[] = [
  {
    provide: 'EVENT_STORE',
    useClass: EventStoreImplement,
  },
  {
    provide: 'INTEGRATION_EVENT_PUBLISHER',
    useClass: IntegrationEventPublisherImplement,
  },
];
@Module({
  providers: [...infrastructure],
  exports: [...infrastructure],
})
export class CommonModule {}
