import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AccountController } from './accounts.controller';
import { CreateAccountBodyDto } from './dto/crate-account.body.dto';

describe('Account Controller', () => {
  let accountController: AccountController;
  let commandBus: CommandBus;
  let queryBus: QueryBus;

  beforeEach(() => {
    let queryBus: QueryBus;
    accountController = new AccountController(commandBus, queryBus);
  });

  describe('createAccount', () => {
    it('should return void', () => {
      const createAccountBodyDto: CreateAccountBodyDto = {
        email: 'test@naver.com',
        password: 'password',
      };

      //   accountController.createAccount(createAccountBodyDto);
    });
  });
});
