import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreateAccountEvent } from 'src/account/domain/event/create-account.event';
import { IntegrationEventPublisher } from 'src/commons/domain/integration.interface';
import { EventStoreImplement } from 'src/commons/infrastructure/cache/redis';
import { TestEvent } from '../../domain/event/test.event.hander';

@EventsHandler(CreateAccountEvent, TestEvent)
export class CreateAccountEventHandler
  implements IEventHandler<CreateAccountEvent | TestEvent>
{
  constructor(
    @Inject('INTEGRATION_EVENT_PUBLISHER')
    readonly publisher: IntegrationEventPublisher,

    @Inject('EVENT_STORE')
    readonly eventStore: EventStoreImplement,
  ) {}
  async handle(event: CreateAccountEvent | TestEvent) {
    console.log('CreateAccountEvent...');

    await this.publisher.publish({
      subject: 'account.create',
      data: {
        id: event.id,
      },
    });

    await this.eventStore.save({
      subject: 'account.create',
      data: event,
    });
  }
}
