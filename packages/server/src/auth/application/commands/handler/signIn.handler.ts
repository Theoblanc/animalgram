import { Inject } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { AccountFactory } from 'src/account/domain/account.factory';
import { AccountRepository } from 'src/account/domain/account.repository';
import { SignInEvent } from 'src/auth/domain/events/signIn.event';
import { TokenTypeEnum } from 'src/commons/domain/enum/token-type.enum';
import { TokenFactory } from 'src/token/domain/token.factory';
import { TokenRepository } from 'src/token/domain/token.repository';
import { AuthService, AuthServiceImpl } from '../../service/auth.service';
import { SignInCommand } from '../impl/signIn.command';

@CommandHandler(SignInCommand)
export class SignInCommandHandler implements ICommandHandler<SignInCommand, string> {
  constructor(
    @Inject('ACCOUNT_TYPEORM')
    private readonly accountRepository: AccountRepository,
    @Inject('TOKEN_TYPEORM')
    private readonly tokenRepository: TokenRepository,
    private readonly accountFactory: AccountFactory,
    private readonly tokenFactory: TokenFactory,
    @Inject(AuthServiceImpl)
    private readonly authService: AuthService,
    private readonly eventBus: EventBus
  ) {}

  async execute(command: SignInCommand): Promise<string> {
    const { email, password } = command;

    const userAccount = await this.accountRepository.findOneByEmail(email);

    const account = this.accountFactory.reconstitute(userAccount.properties());

    // No accout
    if (!account) {
      throw 'Account is not Exsist';
    }

    const isCorrectPassword = account.comparePassword(password);

    if (!isCorrectPassword) {
      throw 'Password is wrong';
    }

    const accessToken = this.authService.generateAccessToken(account.properties().id, account.properties().name);

    const refreshToken = this.authService.generateRefreshToken(account.properties().id, account.properties().name);

    const token = this.tokenFactory.create({
      id: this.tokenRepository.newId(),
      token: refreshToken,
      type: TokenTypeEnum.REFRESH,
      account: account.properties()
    });

    account.update({ token: token.properties().id });

    this.eventBus.publish(new SignInEvent(accessToken, refreshToken));

    account.commit();
    token.commit();

    return account.properties().id;
  }
}
