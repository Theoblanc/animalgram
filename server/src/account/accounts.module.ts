import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateAccountEvent } from './application/event/create-account.envent';
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

const application = [CreateAccountEvent];

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([AccountEntity])],
  controllers: [AccountController],
  providers: [...infrastructure, ...domain, ...application],
})
export class AccountsModule {}
