import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/commons/common.module';
import { TYPEORM_TOKEN } from 'src/commons/domain/enum/typeorm-token.enum';
import { TokenFactory } from './domain/token.factory';
import { TokenEntity } from './infrastructure/entity/token.entity';
import { TokenTypeORM } from './repository/token.typeorm';

const infrastructure: Provider[] = [
  {
    provide: TYPEORM_TOKEN.TOKEN_TYPEORM,
    useClass: TokenTypeORM
  }
];

const domain = [TokenFactory];

@Module({
  imports: [CqrsModule, CommonModule, TypeOrmModule.forFeature([TokenEntity])],
  providers: [...infrastructure, ...domain],
  exports: [...infrastructure, ...domain]
})
export class TokenModule {}
