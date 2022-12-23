import { Inject } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Mutation, Resolver, Subscription } from '@nestjs/graphql';
import { MESSAGE_TYPE } from 'src/commons/domain/enum/message-type.emum';
import { IntegrationEventPublisher } from 'src/commons/domain/integration.interface';
import { SignInCommand } from '../application/commands/impl/signIn.command';
import { Token } from '../domain/model/token.model';
import { SignInArgs } from './dto/signIn.input';

@Resolver('Auths')
export class AuthResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    @Inject(MESSAGE_TYPE.INTEGRATION_EVENT_REDIS)
    private readonly pubSub: IntegrationEventPublisher
  ) {}

  @Mutation(() => String)
  async signIn(@Args('input') input: SignInArgs) {
    const { email, password } = input;

    const command = new SignInCommand(email, password);
    return await this.commandBus.execute(command);
  }

  @Subscription(() => Token, { name: 'signIn' })
  async verificationTokenSent() {
    this.pubSub.asyncIterator('SIGNIN');
  }
}
