import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateAccountBodyDto {
  @IsString()
  @ApiProperty({
    example: 'test@naver.com',
  })
  readonly email: string;

  @IsString()
  @ApiProperty({ example: 'password' })
  readonly password: string;
}
