import { Inject } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Factory } from 'src/commons/domain/base.factory';
import { Account, AccountEssentialProperties, AccountImplement, AccountProperties } from './account';

export class AccountFactory implements Factory<AccountProperties, Account> {
  constructor(@Inject(EventPublisher) private readonly eventPublisher: EventPublisher) {}

  create(properties: AccountEssentialProperties): Account {
    return this.eventPublisher.mergeObjectContext(new AccountImplement(properties));
  }

  reconstitute(properties: AccountProperties): Account {
    return this.eventPublisher.mergeObjectContext(new AccountImplement(properties));
  }
}
