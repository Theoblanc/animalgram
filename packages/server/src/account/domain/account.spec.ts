import { AccountImplement } from './account';
import { CreateAccountEvent } from './event/create-account.event';

describe('Account', () => {
  describe('account properties', () => {
    it('should retured properties', () => {
      const mockUser = {
        id: '1234',
        email: 'test@naver.com',
        balance: 0,
        emailVerified: false
      };

      const account = new AccountImplement(mockUser);

      expect(account.properties()).toEqual({
        id: '1234',
        email: 'test@naver.com'
      });
    });
  });

  describe('create', () => {
    it('should apply AccountOpenedEvent', () => {
      const account = new AccountImplement({
        id: 'id',
        email: 'test@naver.com',
        balance: 0,
        emailVerified: false
      });

      account.createPassword('password');

      const result = account.getUncommittedEvents();

      expect(result).toEqual([new CreateAccountEvent(account.properties())]);
    });
  });
});
