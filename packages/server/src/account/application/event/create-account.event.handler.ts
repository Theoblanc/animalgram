import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreateAccountEvent } from 'src/account/domain/event/create-account.event';
import { IntegrationEventPublisher } from 'src/commons/domain/integration.interface';
import { TestEvent } from '../../domain/event/test.event.hander';

@EventsHandler(CreateAccountEvent, TestEvent)
export class CreateAccountEventHandler implements IEventHandler<CreateAccountEvent | TestEvent> {
  constructor(
    @Inject('INTEGRATION_EVENT_PUBLISHER')
    readonly publisher: IntegrationEventPublisher
  ) {}
  async handle(event: CreateAccountEvent | TestEvent) {
    console.log('CreateAccountEvent...');
  }
}
