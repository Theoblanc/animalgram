import { IEvent } from '@nestjs/cqrs';

export abstract class CqrsEvent {
  constructor(readonly name: string) {}
}

export class TestEvent extends CqrsEvent implements IEvent {
  id: string;
  constructor(id) {
    super(TestEvent.name);
    this.id = id;
  }
}
