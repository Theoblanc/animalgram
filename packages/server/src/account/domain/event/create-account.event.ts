import { IEvent } from '@nestjs/cqrs';
import { CqrsEvent } from 'src/account/domain/event/test.event.hander';
import { AccountProperties } from '../account';

export class CreateAccountEvent extends CqrsEvent implements IEvent {
  constructor(readonly account: AccountProperties) {
    super(CreateAccountEvent.name);
  }
}
