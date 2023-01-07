import { Inject, Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreateAccountEvent } from 'src/account/domain/event/create-account.event';
import { MessageToken } from 'src/commons/domain/enum/message-type.emum';
import { IntegrationEventPublisher } from 'src/commons/domain/message/integration.interface';
import { PubSubTriggers } from 'src/commons/domain/message/PubSubTriggers.enum';
import { TestEvent } from '../../domain/event/test.event.hander';

@EventsHandler(CreateAccountEvent)
export class CreateAccountEventHandler implements IEventHandler<CreateAccountEvent> {
  private readonly logger: Logger;

  constructor(@Inject(MessageToken.INTEGRATION_EVENT_REDIS) private readonly pubSub: IntegrationEventPublisher) {
    this.logger = new Logger(this.constructor.name);
  }

  async handle(event: CreateAccountEvent) {
    this.logger.log('CreateAccountEvent...');

    await this.pubSub.publish('ACCOUNT_SIGNED_UP', {
      [PubSubTriggers.ACCOUNT_SIGNED_UP]: 'HI'
    });
  }
}
