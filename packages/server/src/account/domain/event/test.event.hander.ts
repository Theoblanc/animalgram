import { IEvent } from '@nestjs/cqrs';

export abstract class CqrsEvent {
  constructor(readonly name: string) {}
}

export class TestEvent extends CqrsEvent implements IEvent {
  constructor(readonly id: string) {
    super(TestEvent.name);
  }
}
