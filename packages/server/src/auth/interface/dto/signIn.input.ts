import { Field, ArgsType, InputType } from '@nestjs/graphql';

@InputType()
export class SignInArgs {
  @Field()
  email?: string;

  @Field()
  password: string;
}
