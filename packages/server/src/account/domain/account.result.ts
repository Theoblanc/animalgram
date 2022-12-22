import { createUnionType } from '@nestjs/graphql';
import { Account } from './model/account.model';
import { UserNotFoundError } from './account.error';

export const AccountResult = createUnionType({
  name: 'AccountResult',
  types: () => [Account, UserNotFoundError] as const
});
