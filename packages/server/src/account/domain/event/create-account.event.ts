import { IEvent } from '@nestjs/cqrs';
import { CqrsEvent } from 'src/account/domain/event/test.event.hander';
import { AccountProperties } from '../account';

export class CreateAccountEvent
  extends CqrsEvent
  implements IEvent, AccountProperties
{
  id: string;
  email: string;
  emailVerified: boolean;
  balance: number;
  password?: string;
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  version?: number;

  constructor(readonly account: AccountProperties) {
    super(CreateAccountEvent.name);
    Object.assign(this, account);
  }
}
