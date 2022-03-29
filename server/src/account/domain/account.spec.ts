import { AccountImplement } from './account';

describe('Account', () => {
  describe('account properties', () => {
    it('should retured properties', () => {
      const mockUser = {
        id: '1234',
        email: 'test@naver.com',
      };

      const account = new AccountImplement(mockUser);

      expect(account.properties()).toEqual({
        id: '1234',
        email: 'test@naver.com',
      });
    });
  });
});
