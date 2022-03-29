import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiResponse } from '@nestjs/swagger';
import { CreateAccountCommand } from '../application/command/create-account.command';
import { CreateAccountBodyDto } from './dto/crate-account.body.dto';

@Controller('accounts')
export class AccountController {
  constructor(readonly commandBus: CommandBus, readonly queryBus: QueryBus) {}

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'create account',
    type: CreateAccountBodyDto,
  })
  async createAccount(@Body() body: CreateAccountBodyDto) {
    const command = new CreateAccountCommand(body.email, body.password);
    await this.commandBus.execute(command);
  }
}
