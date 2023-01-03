import { InjectRepository } from '@nestjs/typeorm';
import { Account, AccountProperties } from 'src/account/domain/account';
import { AccountFactory } from 'src/account/domain/account.factory';
import { AccountEntity } from 'src/account/infrastructure/entity/account.entity';
import { BaseRepository } from 'src/commons/domain/base.repository';
import { Repository } from 'typeorm';
import { BaseEntity } from '../entities/base.entity';
import { BaseTypeORM, IModel } from './base.typeorm';

describe('BaseTypeORM', () => {
  const propertiesStub: AccountProperties = {
    id: 'mock_id',
    email: 'mock_email@email.com',
    password: 'mock_password',
    name: 'mock_name',
    emailVerified: true,
    balance: 10,
    version: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: new Date()
  };

  let baseTypeorm: BaseRepository<BaseEntity, IModel<BaseEntity>>;
  let accountEntity: AccountEntity;

  class TestTypeORM extends BaseTypeORM<AccountEntity, Account> {
    constructor(
      @InjectRepository(AccountEntity)
      readonly repo: Repository<AccountEntity>,
      readonly factory: AccountFactory
    ) {
      super(factory);
    }
  }
});
