import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/account/domain/account';
import { AccountFactory } from 'src/account/domain/account.factory';
import { AccountRepository } from 'src/account/domain/account.repository';
import { BaseTypeORM } from 'src/commons/infrastructure/repository/base.typeorm';
import { Repository } from 'typeorm';
import { AccountEntity } from '../entity/account.entity';
@Injectable()
export class AccountTypeORM
  extends BaseTypeORM<AccountEntity, Account>
  implements AccountRepository
{
  constructor(
    @Inject(AccountFactory)
    private readonly accountFactory: AccountFactory,
    @InjectRepository(AccountEntity)
    private accountRepository: Repository<AccountEntity>,
  ) {
    super(accountFactory);
  }

  async save(account: Account | Account[]): Promise<void> {
    const models: Account[] = Array.isArray(account) ? account : [account];
    const entities = models.map((model) => this.modelToEntity(model));

    await this.accountRepository.save(entities);
  }

  async findById(id: string): Promise<Account | null> {
    const entity = await this.accountRepository.findOneBy({id});
    return entity ? this.entityToModel(entity) : null;
  }

  async findOneByEmail(email: string): Promise<Account> {
    const entity = await this.accountRepository.findOneBy({ email });
    return entity ? this.entityToModel(entity) : null;
  }

  findByIds(ids: string[]): Account[] {
    return [];
  }

  findByName(name: string): Account[] {
    return [];
  }
}
