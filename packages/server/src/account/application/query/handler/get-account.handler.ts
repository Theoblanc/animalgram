import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Query } from '@nestjs/graphql';
import { AccountRepository } from 'src/account/domain/account.repository';
import { GetAccountQuery } from '../impl/getAccount.query';

@QueryHandler(GetAccountQuery)
export class GetAccountHandler implements IQueryHandler<GetAccountQuery> {
  constructor(private readonly repository: AccountRepository) {}

  async execute(query) {
    console.log(query);
    return this.repository.findOneByEmail(query);
  }
}
