import { BaseRepository } from 'src/commons/domain/base.repository';
import { TokenEntity } from '../infrastructure/entity/token.entity';
import { Token } from './token';

export interface TokenRepository extends BaseRepository<TokenEntity, Token> {
  save: (token: Token | Token[]) => Promise<void>;
  findById: (id: string) => Promise<Token | null>;
  findByOne: (where) => Promise<Token>;
}
