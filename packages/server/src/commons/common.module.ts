import { Module, Provider } from '@nestjs/common';
import { IntegrationEventPublisherImplement } from './infrastructure/messgae/integration-event.publisher';

const infrastructure: Provider[] = [
 


  
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
