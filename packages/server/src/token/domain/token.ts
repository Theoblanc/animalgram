import { AggregateRoot } from '@nestjs/cqrs';
import { TokenTypeEnum } from 'src/commons/domain/enum/token-type.enum';
import { VerificationTokenSentEvent } from './events/verification-token-sent.event';

export type TokenEssentialProperties = Required<{
  readonly id: string;
}>;

export type TokenOptionalProperties = Partial<{
  readonly token: string;
  readonly type: TokenTypeEnum;
  readonly identifier: string;
  readonly expires: Date;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt: Date;
  readonly version: number;
}>;

export type TokenProperties = TokenEssentialProperties & TokenOptionalProperties;

export interface Token {
  properties: () => TokenProperties;
  send: () => void;
  commit: () => void;
}

export class TokenImplement extends AggregateRoot implements Token {
  private id: string;
  private identifier: string;
  private token: string;
  private type: TokenTypeEnum;
  private expires: Date;
  private readonly createdAt: Date;
  private readonly updatedAt: Date;
  private readonly deletedAt: Date;
  private readonly version: number;

  constructor(properties: TokenProperties) {
    super();
    Object.assign(this, properties);
  }
  properties(): TokenProperties {
    return {
      id: this.id,
      token: this.token,
      identifier: this.identifier,
      type: this.type,
      expires: this.expires,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
      version: this.version
    };
  }

  update(token: Partial<TokenProperties>): void {
    Object.assign(this, token);
  }

  send() {
    this.apply(new VerificationTokenSentEvent(this.properties()));
  }

  isExpired(): boolean {
    const now = Date.now();
    const isExpired = this.expires.valueOf() < now;

    return isExpired;
  }
}
