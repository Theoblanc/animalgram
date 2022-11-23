import { AccountFactory } from 'src/account/domain/account.factory';
import { Repository } from 'typeorm';
import { AccountEntity } from '../entity/account.entity';
import { AccountTypeORM } from './account.typeorm';

describe('AccountRepository', () => {
  let accountRepository: Repository<AccountEntity>;
  let accountFactory: AccountFactory;
  let accountTypeOrm: AccountTypeORM;
  beforeEach(() => {
    accountTypeOrm = new AccountTypeORM(accountFactory, accountRepository);
  });

  describe('newId', async () => {
    it('should return same ID', () => {
      const newId = jest.fn(() => 'abcd1234');
      expect(newId).toHaveBeenCalled();
      expect(newId).toBe('abcd1234');
    });
  });
});
