import { Inject } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Factory } from 'src/commons/domain/base.factory';
import { Account, AccountImplement, AccountProperties } from './account';

export class AccountFactory implements Factory<AccountProperties, Account> {
  constructor(
    @Inject(EventPublisher) private readonly eventPublisher: EventPublisher,
  ) {}

  create(id: string, email: string): Account {
    return this.eventPublisher.mergeObjectContext(
      new AccountImplement({ id, email, balance: 0, emailVerified: false }),
    );
  }

  reconstitute(properties: AccountProperties): Account {
    return this.eventPublisher.mergeObjectContext(
      new AccountImplement(properties),
    );
  }
}
