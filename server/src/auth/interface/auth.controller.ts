import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiResponse } from '@nestjs/swagger';
import { LoginCommand } from '../domain/commands/login.command';
import { LoginBodyDTO } from './dto/login.body.dto';

@Controller('auth')
export class AuthController {
  constructor(readonly commandBus: CommandBus, readonly queryBus: QueryBus) {}

  @Post('login')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'create account',
    type: LoginBodyDTO,
  })
  async login(@Body() body: LoginBodyDTO) {
    const command = new LoginCommand(body.email, body.password);
    await this.commandBus.execute(command);
  }
}
