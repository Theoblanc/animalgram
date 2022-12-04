import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AccountResolver {
  @Query(() => String)
  async author() {
    return 'HI';
  }
}
