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
    private readonly accountFactory: AccountFactory,
    private readonly eventBus: EventBus
  ) {}

  async execute(command: CreateAccountCommand): Promise<void> {
    const { email, password } = command;

    // MergeObjectContext
    const account = this.accountFactory.create(this.accountRepository.newId(), email);

    // AccountImplement
    account.create(password);
    await this.accountRepository.save(account);

    //test
    this.eventBus.publish(new TestEvent('123'));

    account.commit();
  }
}
