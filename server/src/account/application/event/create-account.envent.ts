import { IEvent } from '@nestjs/cqrs';
import { AccountProperties } from 'src/account/domain/account';

export class CreateAccountEvent implements IEvent, AccountProperties {
  readonly id: string;
  readonly email: string;
  readonly password?: string;
  readonly name?: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
  readonly deletedAt?: Date;
  readonly version?: number;
}
