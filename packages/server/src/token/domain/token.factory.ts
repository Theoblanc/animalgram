import { Inject } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Factory } from 'src/commons/domain/base.factory';
import { Token, TokenImplement, TokenProperties } from './token';

export class TokenFactory implements Factory<TokenProperties, Token> {
  constructor(@Inject(EventPublisher) private readonly eventPublisher: EventPublisher) {}

  create({ id, token, type }: TokenProperties) {
    return this.eventPublisher.mergeObjectContext(
      new TokenImplement({
        id,
        token,
        type
      })
    );
  }

  reconstitute(properties: TokenProperties): Token {
    return this.eventPublisher.mergeObjectContext(new TokenImplement(properties));
  }
}
