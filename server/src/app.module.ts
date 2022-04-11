import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsModule } from './account/accounts.module';
import { AccountEntity } from './account/infrastructure/entity/account.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './commons/common.module';
import { postgresTypeORM } from './commons/infrastructure/settings/postgres.setting';
import { HealthModule } from './health/health.module';

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
    AccountsModule,
    HealthModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
