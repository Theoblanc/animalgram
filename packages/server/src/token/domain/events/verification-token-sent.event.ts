import { IEvent } from '@nestjs/cqrs';
import { TokenProperties } from '../token';

export class VerificationTokenSentEvent implements IEvent {
  constructor(readonly token: TokenProperties) {}
}
