import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Context, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { CreateAccountCommand } from '../application/commands/impl/create-account.command';
import { GetAccountQuery } from '../application/query/impl/getAccount.query';
import { SignInInputDTO } from './dto/signIn.args.dto';
import { AccountModel } from './model/account.dto';

@Resolver('Accounts')
export class AccountResolver {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}
  @Query(() => String)
  async author() {
    return 'HI';
  }

  @Mutation(() => String, { nullable: true })
  async signIn(@Args('input') args: SignInInputDTO, @Context() ctx): Promise<void> {
    const command = new CreateAccountCommand(args.email, args.password);
    return await this.commandBus.execute(command);
  }

  @Query(() => AccountModel)
  async getMe() {
    const email = 'xogus1015@naver.com';
    const query = new GetAccountQuery(email);

    return await this.queryBus.execute(query);
  }
}
