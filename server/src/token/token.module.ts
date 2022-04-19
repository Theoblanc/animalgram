import { Module, Provider } from '@nestjs/common';
import { TYPEORM_TOKEN } from 'src/commons/domain/enum/typeorm-token.enum';
import { TokenTypeORM } from './repository/token.typeorm';

const infrastructure: Provider[] = [
  {
    provide: TYPEORM_TOKEN.TOKEN_TYPEORM,
    useClass: TokenTypeORM,
  },
];

@Module({
  providers: [...infrastructure],
})
export class TokenModule {}
