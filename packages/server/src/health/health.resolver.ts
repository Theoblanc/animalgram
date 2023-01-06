import { Args, Resolver, Subscription } from '@nestjs/graphql';
import { IntegrationEventPublisher } from 'src/commons/domain/message/integration.interface';
import { Inject } from '@nestjs/common';
import { MessageToken } from 'src/commons/domain/enum/message-type.emum';

@Resolver()
export class HealthResolver {
  constructor(@Inject(MessageToken.INTEGRATION_EVENT_REDIS) private readonly pubSub: IntegrationEventPublisher) {}
  @Subscription(() => String, { name: 'checkHealth' })
  async checkHealth() {
    return this.pubSub.asyncIterator('checkHealth');
  }
}
