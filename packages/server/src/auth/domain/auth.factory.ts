import { Auth, AuthImplement, AuthProperties } from './auth';
import { EventPublisher } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { Factory } from 'src/commons/domain/base.factory';

export class AuthFactory implements Factory<AuthProperties, Auth> {
  constructor(
    @Inject(EventPublisher) private readonly eventPublisher: EventPublisher,
  ) {}

  create(accessToken: string, refreshToken: string) {
    return this.eventPublisher.mergeObjectContext(
      new AuthImplement({
        accessToken,
        refreshToken,
      }),
    );
  }

  reconstitute(properties: AuthProperties): Auth {
    return this.eventPublisher.mergeObjectContext(
      new AuthImplement(properties),
    );
  }
}
