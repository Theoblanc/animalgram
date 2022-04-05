import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AccountRepository } from 'src/account/domain/account.repository';
import { LoginCommand } from '../commands/login.command';

@CommandHandler(LoginCommand)
export class LoginHandler implements ICommandHandler<LoginCommand, void> {
  constructor(
    @Inject('ACCOUNT_TYPEORM')
    private readonly accountRepository: AccountRepository,
  ) {}
  execute(command: LoginCommand): Promise<void> {
    const { email, password } = command;

    return;
  }
}
