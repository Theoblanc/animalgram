import { Inject } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { AccountFactory } from 'src/account/domain/account.factory';
import { AccountRepository } from 'src/account/domain/account.repository';
import { TokenTypeEnum } from 'src/commons/domain/enum/token-type.enum';
import { TokenFactory } from 'src/token/domain/token.factory';
import { TokenRepository } from 'src/token/domain/token.repository';
import { AuthService } from '../../service/auth.service';
import { SignInCommand } from '../impl/signIn.command';

@CommandHandler(SignInCommand)
export class LoginCommandHandler
  implements ICommandHandler<SignInCommand, void>
{
  constructor(
    @Inject('ACCOUNT_TYPEORM')
    private readonly accountRepository: AccountRepository,
    private readonly accountFactory: AccountFactory,
    private readonly tokenFactory: TokenFactory,
    private readonly tokenRepository: TokenRepository,
    private readonly authService: AuthService,
    private readonly eventBus: EventBus,
  ) {}
  async execute(command: SignInCommand): Promise<void> {
    const { email, password } = command;

    const findedAccount = await this.accountRepository.findOneByEmail(email);

    const account = this.accountFactory.reconstitute(
      findedAccount.properties(),
    );

    account.properties().id;

    const accessToken = this.authService.generateToken(
      account.properties().id,
      account.properties().name,
    );

    const token = this.tokenFactory.create({
      id: this.tokenRepository.newId(),
      token: accessToken,
      type: TokenTypeEnum.ACCESS,
      account: account.properties(),
    });

    if (!account) {
      throw 'Account is not found';
    }

    const isCorrectPassword = account.comparePassword(password);

    if (!isCorrectPassword) {
      throw 'Password is wrong';
    }

    account.update({ token: token.properties().id });

    account.commit();
    token.commit();
  }
}
