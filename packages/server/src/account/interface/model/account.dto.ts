import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AccountModel {
  @Field(() => String)
  id: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  name?: string;

  @Field(() => String)
  image?: string;

  @Field(() => Int)
  balance: number;

  @Field(() => Boolean)
  emailVerified: boolean;

  @Field(() => String)
  token: string;

  @Field(() => Date)
  createdAt?: Date;
}
