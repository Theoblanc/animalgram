import { AccountTypeORM } from './account.typeorm';

describe('AccountRepository', () => {
  let accountRepository;

  beforeEach(() => {
    accountRepository = new AccountTypeORM();
  });

  describe('newId', async () => {
    const newId = jest.fn(() => 'abcd1234');

    expect(newId).toHaveBeenCalled();
    expect(newId).toBe('abcd1234');
  });
});
