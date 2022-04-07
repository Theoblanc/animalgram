import { IEvent } from '@nestjs/cqrs';
import { AccountProperties } from '../account';

export class CreateAccountEvent implements IEvent {
  constructor(readonly account: AccountProperties) {}
}
