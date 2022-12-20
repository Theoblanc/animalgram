import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AccountRepository } from 'src/account/domain/account.repository';
import { GetAccountQuery } from '../impl/getAccount.query';

@QueryHandler(GetAccountQuery)
export class GetAccountHandler implements IQueryHandler<GetAccountQuery> {
  constructor(
    @Inject('ACCOUNT_TYPEORM')
    private readonly repository: AccountRepository
  ) {}

  async execute(query) {
    return await this.repository.findOneByEmail(query.email);
  }
}
