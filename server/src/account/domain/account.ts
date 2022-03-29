import { AggregateRoot } from '@nestjs/cqrs';
import * as bcrypt from 'bcryptjs';
import { CreateAccountEvent } from '../application/event/create-account.envent';

export type AccountEssentialProperties = Required<{
  readonly id: string;
  readonly email: string;
}>;

export type AccountOptionalProperties = Partial<{
  readonly password: string;
  readonly name: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt: Date;
  readonly version: number;
}>;

export type AccountProperties = AccountEssentialProperties &
  AccountOptionalProperties;

export interface Account {
  properties: () => AccountProperties;
}

export class AccountImplement extends AggregateRoot implements Account {
  private id: string;
  private email: string;
  private password: string;
  private name: string;
  private createdAt: Date;
  private updatedAt: Date;
  private deletedAt: Date;
  private version: number;

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
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
      version: this.version,
    };
  }

  open(password: string): void {
    this.setPassword(password);
    this.apply(Object.assign(new CreateAccountEvent(), this));
  }

  setPassword(password) {
    const salt = bcrypt.genSaltSync();
    this.password = bcrypt.hashSync(password, salt);
    this.updatedAt = new Date();
  }

  comparePassword(password: string): boolean {
    return bcrypt.compareSync(password, this.password);
  }
}
