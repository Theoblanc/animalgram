import { CreateAccountCommand } from './create-account.command';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AccountRepository } from 'src/account/domain/account.repository';
import { AccountFactory } from 'src/account/domain/account.factory';
import { Inject } from '@nestjs/common';

@CommandHandler(CreateAccountCommand)
export class CreaetAccountHandler
  implements ICommandHandler<CreateAccountCommand, void>
{
  constructor(
    @Inject('ACCOUNT_TYPEORM')
    private readonly accountRepository: AccountRepository,
    private readonly accountFactory: AccountFactory,
  ) {}

  async execute(command: CreateAccountCommand): Promise<void> {
    const account = this.accountFactory.create(
      await this.accountRepository.newId(),
      command.email,
    );

    account.create(command.password);

    await this.accountRepository.save(account);

    account.commit();
  }
}
