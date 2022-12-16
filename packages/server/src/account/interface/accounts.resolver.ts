import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateAccountCommand } from '../application/commands/impl/create-account.command';
import { SignInInputDTO } from './dto/signIn.args.dto';

@Resolver()
export class AccountResolver {
  constructor(readonly commandBus: CommandBus, readonly queryBus: QueryBus) {}
  @Query(() => String)
  async author() {
    return 'HI';
  }

  @Mutation(() => String, { nullable: true })
  async signIn(@Args('input') args: SignInInputDTO, @Context() ctx): Promise<void> {
    const command = new CreateAccountCommand(args.email, args.password);
    return await this.commandBus.execute(command);
  }
}
