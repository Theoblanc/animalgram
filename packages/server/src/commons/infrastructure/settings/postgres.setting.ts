import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AccountEntity } from 'src/account/infrastructure/entity/account.entity';
import { TokenEntity } from 'src/token/infrastructure/entity/token.entity';

export function postgresTypeORM(config: ConfigService): TypeOrmModuleOptions {
  console.log('config', config);
  return {
    type: 'postgres',
    host: config.get('POSTGRES_HOST'),
    port: parseInt(config.get('POSTGRES_PORT'), 10),
    database: config.get('POSTGRES_DB'),
    username: config.get('POSTGRES_USER'),
    password: config.get('POSTGRES_PASSWORD'),
    synchronize: config.get('POSTGRES_SYNC') === 'true',
    logging: config.get('POSTGRES_LOGGING') === 'true',
    entities: [AccountEntity, TokenEntity]
  };
}
