import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { SignInCommand } from '../application/commands/impl/signIn.command';
import { SignInArgs } from './dto/signIn.args';

@Resolver('Auths')
export class AuthResolver {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @Mutation(() => String)
  async signIn(@Args('input') args: SignInArgs) {
    const { email, password } = args;

    const command = new SignInCommand(email, password);
    return await this.commandBus.execute(command);
  }
}
