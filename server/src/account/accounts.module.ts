import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/commons/common.module';
import { TYPEORM_TOKEN } from 'src/commons/domain/enum/typeorm-token.enum';
import { CreaetAccountCommandHandler } from './application/commands/handler/create-account.handler';
import { CreateAccountEventHandler } from './application/event/create-account.event.handler';
import { AccountFactory } from './domain/account.factory';
import { AccountEntity } from './infrastructure/entity/account.entity';
import { AccountTypeORM } from './infrastructure/repository/account.typeorm';
import { AccountController } from './interface/accounts.controller';

const infrastructure: Provider[] = [
  {
    provide: TYPEORM_TOKEN.ACCOUNT_TYPEORM,
    useClass: AccountTypeORM,
  },
];

const domain = [AccountFactory];

const application = [CreaetAccountCommandHandler, CreateAccountEventHandler];

@Module({
  imports: [
    CqrsModule,
    CommonModule,
    TypeOrmModule.forFeature([AccountEntity]),
  ],
  controllers: [AccountController],
  providers: [...infrastructure, ...domain, ...application],
})
export class AccountsModule {}
