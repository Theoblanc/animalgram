import { AggregateRoot } from '@nestjs/cqrs';
import * as bcrypt from 'bcryptjs';
import { CreateAccountEvent } from './event/create-account.event';

export type AccountEssentialProperties = Required<{
  readonly id: string;
  readonly email: string;
  readonly emailVerified: boolean;
  readonly balance: number;
}>;

export type AccountOptionalProperties = Partial<{
  readonly name: string;
  readonly password: string;
  readonly image: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt: Date;
  readonly version: number;
}>;

export type AccountProperties = AccountEssentialProperties &
  AccountOptionalProperties;

export interface Account {
  properties: () => AccountProperties;
  create: (password: string) => void;
  comparePassword: (password: string) => boolean;
  commit: () => void;
}

export class AccountImplement extends AggregateRoot implements Account {
  private id: string;
  private email: string;
  private password?: string;
  private name?: string;
  private image?: string;
  private balance: number;
  private emailVerified: boolean;
  private createdAt?: Date;
  private updatedAt?: Date;
  private deletedAt?: Date;
  private version?: number;

  constructor(properties: AccountProperties) {
    super();
    Object.assign(this, properties);
  }

  properties() {
    return {
      id: this.id,
      email: this.email,
      password: this.password,
      name: this.name,
      image: this.image,
      balance: this.balance,
      emailVerified: this.emailVerified,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
      version: this.version,
    };
  }

  create(password: string): void {
    this.setPassword(password);
    this.apply(new CreateAccountEvent(this.properties()));
  }

  setPassword(password) {
    const salt = bcrypt.genSaltSync();
    this.password = bcrypt.hashSync(password, salt);
  }

  comparePassword(password: string): boolean {
    return bcrypt.compareSync(password, this.password);
  }

  update(account: Partial<AccountProperties>): void {
    Object.assign(this, account);
  }
}
