import { BaseTypeORM } from 'src/commons/infrastructure/repository/base.typeorm';
import { Token } from '../domain/token';
import { TokenRepository } from '../domain/token.repository';
import { TokenEntity } from '../infrastructure/entity/token.entity';

export class TokenTypeORM
  extends BaseTypeORM<TokenEntity, Token>
  implements TokenRepository
{
  save: (token: Token | Token[]) => Promise<void>;
  findById: (id: string) => Promise<Token>;
  findByOne: (where: any) => Promise<Token>;
}
