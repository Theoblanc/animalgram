import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SignInInputDTO } from './dto/signIn.args.dto';

@Resolver()
export class AccountResolver {
  @Query(() => String)
  async author() {
    return 'HI';
  }

  @Mutation(() => String, { nullable: true })
  async signIn(@Args('input') args: SignInInputDTO, @Context() ctx): Promise<void> {}
}
