import { AggregateRoot } from '@nestjs/cqrs';
import { AccountEntity } from 'src/account/infrastructure/entity/account.entity';
import { TokenTypeEnum } from 'src/commons/domain/enum/token-type.enum';

export type TokenEssentialProperties = Required<{
  readonly id: string;
}>;

export type TokenOptionalProperties = Partial<{
  token: string;
  type: TokenTypeEnum;
  account: AccountEntity;
  expiresIn: Date;
}>;

export type TokenProperties = TokenEssentialProperties &
  TokenOptionalProperties;

export interface Token {
  properties: () => TokenProperties;
  commit: () => void;
}

export class TokenImplement extends AggregateRoot implements Token {
  private id: string;
  private token: string;
  private type: TokenTypeEnum;
  private account: AccountEntity;
  private expiresIn: Date;

  constructor(properties: TokenProperties) {
    super();
    Object.assign(this, properties);
  }
  properties(): TokenProperties {
    return {
      id: this.id,
      token: this.token,
      type: this.type,
      account: this.account,
      expiresIn: this.expiresIn,
    };
  }
}
