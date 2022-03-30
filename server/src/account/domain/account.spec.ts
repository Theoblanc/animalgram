import { CreateAccountEvent } from '../application/event/create-account.envent';
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

  describe('create', () => {
    it('should apply AccountOpenedEvent', () => {
      const account = new AccountImplement({
        id: 'id',
        email: 'test@naver.com',
      });

      account.create('password');

      const result = account.getUncommittedEvents();

      expect(result).toEqual([new CreateAccountEvent(account.properties())]);
    });
  });
});
