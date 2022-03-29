import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AccountFactory } from './domain/account.factory';
import { AccountEntity } from './infrastructure/entity/account.entity';
import { AccountTypeORM } from './infrastructure/repository/account.typeorm';
import { AccountController } from './interface/accounts.controller';

const infrastructure: Provider[] = [
  {
    provide: 'ACCOUNT_TYPEORM',
    useClass: AccountTypeORM,
  },
];

const domain = [AccountFactory];

@Module({
  imports: [CqrsModule],
  controllers: [AccountController],
  providers: [...infrastructure, ...domain],
})
export class AccountsModule {}
