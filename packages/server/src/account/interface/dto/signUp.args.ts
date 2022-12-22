import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

@InputType()
export class SignUpArgs {
  @Field({ description: 'user email' })
  @IsEmail()
  readonly email: string;

  @Field(() => String)
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  readonly password: string;
}
