import { Field, ArgsType } from '@nestjs/graphql';

@ArgsType()
export class SignInArgs {
  @Field()
  email?: string;

  @Field()
  password: string;
}
