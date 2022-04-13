import { BaseRepository } from 'src/commons/domain/base.repository';
import { AccountEntity } from '../infrastructure/entity/account.entity';
import { Account } from './account';

export interface AccountRepository
  extends BaseRepository<AccountEntity, Account> {
  save: (account: Account | Account[]) => Promise<void>;
  findById: (id: string) => Promise<Account | null>;
  findByIds: (ids: string[]) => Promise<Account[]>;
  findByName: (name: string) => Promise<Account[]>;
  findOneBy: (where) => Promise<Account>;
}
