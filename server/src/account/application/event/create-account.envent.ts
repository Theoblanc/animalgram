import { IEvent } from '@nestjs/cqrs';
import { AccountProperties } from 'src/account/domain/account';

export class CreateAccountEvent implements IEvent {
  constructor(readonly account: AccountProperties) {}
}
