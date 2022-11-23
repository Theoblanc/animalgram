import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiResponse } from '@nestjs/swagger';
import { SignInCommand } from '../application/commands/impl/signIn.command';
import { SignInBodyDTO } from './dto/login.body.dto';

@Controller('auth')
export class AuthController {
  constructor(readonly commandBus: CommandBus, readonly queryBus: QueryBus) {}

  @Post('login')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'login user',
    type: SignInBodyDTO,
  })
  async login(@Body() body: SignInBodyDTO) {
    const command = new SignInCommand(body.email, body.password);
    await this.commandBus.execute(command);
  }
}
