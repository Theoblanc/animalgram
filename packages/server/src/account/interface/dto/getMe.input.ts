import { Field, InputType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@InputType()
export class GetMeInputDTO {
  @Field({ description: 'user email' })
  @IsEmail()
  readonly email: string;
}
