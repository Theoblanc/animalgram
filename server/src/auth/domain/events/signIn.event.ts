import { IEvent } from '@nestjs/cqrs';
import { CqrsEvent } from 'src/account/domain/event/test.event.hander';

export class SignInEvent extends CqrsEvent implements IEvent {
  constructor() {
    super(SignInEvent.name);
  }
}
