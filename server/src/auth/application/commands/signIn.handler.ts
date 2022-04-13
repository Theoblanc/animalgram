import { Inject } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { AccountFactory } from 'src/account/domain/account.factory';
import { AccountRepository } from 'src/account/domain/account.repository';
import { SignInCommand } from './signIn.command';

@CommandHandler(SignInCommand)
export class LoginCommandHandler
  implements ICommandHandler<SignInCommand, void>
{
  constructor(
    @Inject('ACCOUNT_TYPEORM')
    private readonly accountRepository: AccountRepository,
    private readonly accountFactory: AccountFactory,

    private readonly eventBus: EventBus,
  ) {}
  async execute(command: SignInCommand): Promise<void> {
    const { email, password } = command;

    const findedAccount = await this.accountRepository.findOneBy({ email });

    const account = this.accountFactory.reconstitute(
      findedAccount.properties(),
    );

    if (!account) {
      throw 'Account is not found';
    }

    const isCorrectPassword = account.comparePassword(password);

    if (!isCorrectPassword) {
      throw 'Password is wrong';
    }

    account.commit();
  }
}
