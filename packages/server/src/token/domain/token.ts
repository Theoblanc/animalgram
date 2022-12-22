import { AggregateRoot } from '@nestjs/cqrs';
import { AccountProperties } from 'src/account/domain/account';
import { TokenTypeEnum } from 'src/commons/domain/enum/token-type.enum';

export type TokenEssentialProperties = Required<{
  readonly id: string;
}>;

export type TokenOptionalProperties = Partial<{
  readonly token: string;
  readonly type: TokenTypeEnum;
  readonly account: AccountProperties;
}>;

export type TokenProperties = TokenEssentialProperties & TokenOptionalProperties;

export interface Token {
  properties: () => TokenProperties;
  commit: () => void;
}

export class TokenImplement extends AggregateRoot implements Token {
  private id: string;
  private token: string;
  private type: TokenTypeEnum;
  private account: AccountProperties;

  constructor(properties: TokenProperties) {
    super();
    Object.assign(this, properties);
  }
  properties(): TokenProperties {
    return {
      id: this.id,
      token: this.token,
      type: this.type,
      account: this.account
    };
  }

  update(token: Partial<TokenProperties>): void {
    Object.assign(this, token);
  }

  createFingerprint() {}
}
