import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsModule } from './account/accounts.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './commons/common.module';
import { postgresTypeORM } from './commons/infrastructure/settings/postgres.setting';
import { HealthModule } from './health/health.module';
import { RedisModule } from '@nestjs-modules/ioredis';
import { redisFactory } from './commons/infrastructure/cache/redis';

const modules = [AccountsModule, HealthModule, CommonModule];

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: postgresTypeORM,
      inject: [ConfigService],
    }),
    RedisModule.forRootAsync({
      useFactory: redisFactory,
    }),
    ...modules,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
