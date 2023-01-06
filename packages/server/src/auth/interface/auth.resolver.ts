import { Inject } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Resolver, Subscription } from '@nestjs/graphql';
import { MessageToken } from 'src/commons/domain/enum/message-type.emum';
import { IntegrationEventPublisher } from 'src/commons/domain/message/integration.interface';
import { Token } from '../domain/model/token.model';

@Resolver('Auths')
export class AuthResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    @Inject(MessageToken.INTEGRATION_EVENT_REDIS)
    private readonly pubSub: IntegrationEventPublisher
  ) {}

  @Subscription(() => Token, { name: 'signIn' })
  async verificationTokenSent() {
    this.pubSub.asyncIterator('SIGNIN');
  }
}
