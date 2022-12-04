import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsModule } from './account/accounts.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './commons/common.module';
import { postgresTypeORM } from './commons/infrastructure/settings/postgres.setting';
import { HealthModule } from './health/health.module';
import { redisFactory } from './commons/infrastructure/cache/redis';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GqlConfigService } from './commons/infrastructure/settings/graphql.setting';

const modules = [AccountsModule, HealthModule, CommonModule];

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      useFactory: postgresTypeORM,
      inject: [ConfigService]
    }),
    RedisModule.forRootAsync({
      useFactory: redisFactory,
      inject: [ConfigService]
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useClass: GqlConfigService
    }),
    ...modules
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
