import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

@ObjectType()
export class CreateAccountBodyDTO {
  @IsString()
  @ApiProperty({
    example: 'test@naver.com'
  })
  @Field(() => String)
  readonly email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @ApiProperty({ minLength: 8, maxLength: 20, example: 'password' })
  @Field(() => String)
  readonly password: string;
}
