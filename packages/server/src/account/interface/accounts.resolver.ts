import { Inject } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Context, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { MESSAGE_TYPE } from 'src/commons/domain/enum/message-type.emum';
import { IntegrationEventPublisher } from 'src/commons/domain/integration.interface';
import { CreateAccountCommand } from '../application/commands/impl/create-account.command';
import { GetAccountQuery } from '../application/query/impl/getAccount.query';
import { AccountResult } from '../domain/account.result';
import { SignUpArgs } from './dto/signUp.args';

@Resolver('Accounts')
export class AccountResolver {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}
  @Mutation(() => String, { nullable: true })
  async signUp(@Args('input') args: SignUpArgs, @Context() ctx): Promise<void> {
    const command = new CreateAccountCommand(args.email, args.password);
    return await this.commandBus.execute(command);
  }

  @Query(() => AccountResult)
  async getMe() {
    const email = 'xogus1015@naver.com';
    const query = new GetAccountQuery(email);
    return await this.queryBus.execute(query);
  }
}
