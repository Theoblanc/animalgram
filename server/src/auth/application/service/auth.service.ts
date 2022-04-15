import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccountFactory } from 'src/account/domain/account.factory';
import { AccountRepository } from 'src/account/domain/account.repository';

@Injectable()
export class AuthService {
  constructor(
    @Inject('ACCOUNT_TYPEORM')
    private readonly accountRepository: AccountRepository,
    private readonly accountFactory: AccountFactory,
    private readonly jwtService: JwtService,
  ) {}

  generateToken(userId, username) {
    const payload = { username, id: userId, iat: Date.now() };
    return this.jwtService.sign(payload);
  }
}
