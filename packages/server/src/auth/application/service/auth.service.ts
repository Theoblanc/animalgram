import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccountFactory } from 'src/account/domain/account.factory';
import { AccountRepository } from 'src/account/domain/account.repository';

export interface AuthService {
  generateAccessToken(userId: string, username: string): string;
  generateRefreshToken(userId: string, username: string): string;
}
@Injectable()
export class AuthServiceImpl implements AuthService {
  constructor(private readonly jwtService: JwtService) {}

  generateAccessToken(userId: string, username: string) {
    const payload = { username, id: userId, iat: Date.now(), exp: '15m' };
    return this.jwtService.sign(payload);
  }

  generateRefreshToken(userId: string, username: string) {
    const payload = { username, id: userId, iat: Date.now(), exp: '1d' };
    return this.jwtService.sign(payload);
  }

  generateFingerPrint() {}
}
