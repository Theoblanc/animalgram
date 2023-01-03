import { ModuleMetadata, Provider } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AccountFactory } from 'src/account/domain/account.factory';
import { AccountRepository } from 'src/account/domain/account.repository';
import { TYPEORM_TOKEN } from 'src/commons/domain/enum/typeorm-token.enum';
import { CreateAccountEventHandler } from '../../event/create-account.event.handler';
import { CreateAccountCommand } from '../impl/create-account.command';
import { CreaetAccountCommandHandler } from './create-account.handler';

describe('CreateAccountHandler', () => {
  let handler: CreaetAccountCommandHandler;
  let repository: AccountRepository;
  let factory: AccountFactory;

  beforeAll(async () => {
    const repoProvider: Provider = {
      provide: TYPEORM_TOKEN.ACCOUNT_TYPEORM,
      useValue: {}
    };

    const factoryProvider: Provider = {
      provide: AccountFactory,
      useValue: {}
    };

    const providers: Provider[] = [CreaetAccountCommandHandler, repoProvider, factoryProvider];
    const moduleMetadata: ModuleMetadata = { providers };
    const testModule = await Test.createTestingModule(moduleMetadata).compile();

    handler = testModule.get(CreateAccountEventHandler);
    repository = testModule.get(TYPEORM_TOKEN.ACCOUNT_TYPEORM);
    factory = testModule.get(AccountFactory);
  });

  describe('execute', () => {
    it('should execute CreateAccountCommand', async () => {
      const account = {
        createPassword: jest.fn(),
        commit: jest.fn()
      };

      factory.create = jest.fn().mockReturnValue(account);
      repository.newId = jest.fn().mockResolvedValue('accountId');
      repository.save = jest.fn().mockResolvedValue(undefined);

      const command = new CreateAccountCommand('email', 'password');

      await expect(handler.execute(command)).resolves.toEqual(undefined);
      expect(repository.newId).toBeCalledTimes(1);
      expect(account.createPassword).toBeCalledTimes(1);
      expect(repository.save).toBeCalledTimes(1);
      expect(repository.save).toBeCalledWith(account);
      expect(account.commit).toBeCalledTimes(1);
    });
  });
});
