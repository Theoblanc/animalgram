import { Inject, Logger } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { MessageToken } from 'src/commons/domain/enum/message-type.emum';
import { CreateAccountCommand } from '../application/commands/impl/create-account.command';
import { GetAccountQuery } from '../application/query/impl/getAccount.query';
import { AccountResult } from '../domain/account.result';
import { SignUpArgs } from './dto/signUp.args';
import { IntegrationEventPublisher } from 'src/commons/domain/message/integration.interface';
import { PubSubTriggers } from 'src/commons/domain/message/PubSubTriggers.enum';
import { FILTER_STATE } from 'src/commons/interface/fillter';

@Resolver('Accounts')
export class AccountResolver {
  private readonly logger: Logger;

  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    @Inject(MessageToken.INTEGRATION_EVENT_REDIS)
    private readonly pubSub: IntegrationEventPublisher
  ) {
    this.logger = new Logger(this.constructor.name);
  }

  @Mutation(() => String, { nullable: true })
  async signUp(@Args('input') args: SignUpArgs): Promise<void> {
    const { email, password } = args;
    const command = new CreateAccountCommand(email, password);
    return await this.commandBus.execute(command);
  }

  @Subscription(() => AccountResult, { filter: FILTER_STATE('accountSignedup') })
  async accountSignedup() {
    this.logger.log(`subscribe to ${PubSubTriggers.ACCOUNT_SIGNED_UP}: 'accountSignedup'`);

    return await this.pubSub.asyncIterator(PubSubTriggers.ACCOUNT_SIGNED_UP);
  }

  @Query(() => AccountResult)
  async getMe() {
    const email = 'xogus1015@naver.com';
    const query = new GetAccountQuery(email);
    return await this.queryBus.execute(query);
  }
}
