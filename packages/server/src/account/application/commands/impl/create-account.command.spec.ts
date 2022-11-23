import { CreateAccountCommand } from './create-account.command';

describe('Create Account Command', () => {
  it('appService should be defined', () => {
    const command = new CreateAccountCommand('xogus1015@naver.com', '1234');
    expect(command).toBeDefined();
  });
});
