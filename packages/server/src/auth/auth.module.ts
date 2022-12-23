import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { AccountsModule } from 'src/account/accounts.module';

import { InfrastructureModule } from 'src/commons/infrastructure/Infrastructure.module';
import { TokenModule } from 'src/token/token.module';
import { SignInCommandHandler } from './application/commands/handler/signIn.handler';
import { AuthServiceImpl } from './application/service/auth.service';
import { AuthResolver } from './interface/auth.resolver';

const application = [SignInCommandHandler, AuthResolver, AuthServiceImpl, JwtService];

@Module({
  imports: [CqrsModule, InfrastructureModule, AccountsModule, TokenModule],
  providers: [...application]
})
export class AuthModule {}
