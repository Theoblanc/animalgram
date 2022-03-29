import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { AccountEntity } from './account/infrastructure/entity/account.entity';

interface DBConfig {
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
  synchronize: boolean;
  logging: boolean;
}

@Injectable()
export class AppService {
  // private postgres: DataSource;
  static port(): number {
    const { PORT } = process.env;
    return PORT && Number(PORT) ? Number(PORT) : 4000;
  }
  // async onModuleInit(): Promise<void> {
  //   const entities = [AccountEntity];
  //   const postgres = new DataSource({
  //     ...this.loadDBConfig(),
  //     entities,
  //     type: 'postgres',
  //   });
  //   postgres
  //     .initialize()
  //     .catch((error: Error) => this.failToConnectDatabase(error));
  // }
  // private loadDBConfig(): DBConfig {
  //   return {
  //     host: process.env.POSTGRES_HOST || 'localhost',
  //     port: parseInt(process.env.POSTGRES_PORT),
  //     database: process.env.POSTGRES_DB,
  //     username: process.env.POSTGRES_USER,
  //     password: process.env.POSTGRES_PASSWORD,
  //     synchronize: 'true' === process.env.DATABASE_SYNC || true,
  //     logging: 'true' === process.env.DATABASE_LOGGING || true,
  //   };
  // }
  // private failToConnectDatabase(error: Error): void {
  //   console.error(error);
  //   process.exit(1);
  // }
  // async onModuleDestroy(): Promise<void> {
  //   if (this.postgres) {
  //     await this.postgres.destroy();
  //   }
  // }
}
