import { CreateAccountCommand } from '../impl/create-account.command';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { AccountRepository } from 'src/account/domain/account.repository';
import { AccountFactory } from 'src/account/domain/account.factory';
import { Inject, Injectable } from '@nestjs/common';
import { TestEvent } from '../../../domain/event/test.event.hander';

@Injectable()
@CommandHandler(CreateAccountCommand)
export class CreaetAccountCommandHandler implements ICommandHandler<CreateAccountCommand, void> {
  constructor(
    @Inject('ACCOUNT_TYPEORM')
    private readonly accountRepository: AccountRepository,
    private readonly accountFactory: AccountFactory
  ) {}

  async execute(command: CreateAccountCommand): Promise<void> {
    const { email, password } = command;

    // MergeObjectContext
    const account = this.accountFactory.create({
      id: this.accountRepository.newId(),
      email,
      emailVerified: true,
      balance: 0
    });

    // AccountImplement
    account.createPassword(password);

    await this.accountRepository.save(account);

    account.commit();
  }
}
