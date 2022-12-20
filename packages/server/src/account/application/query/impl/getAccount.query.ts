import { IQuery } from '@nestjs/cqrs';
import { AccountProperties } from 'src/account/domain/account';

export class GetAccountQuery implements IQuery {
  constructor(readonly email: string) {}
}
