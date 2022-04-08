import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreateAccountEvent } from 'src/account/domain/event/create-account.event';
import { TestEvent } from '../../domain/event/test.event.hander';

@EventsHandler(CreateAccountEvent, TestEvent)
export class CreateAccountEventHandler
  implements IEventHandler<CreateAccountEvent | TestEvent>
{
  handle(event: CreateAccountEvent | TestEvent) {
    console.log('========');
    console.log('========');
    console.log('========');
    console.log('========');
    console.log('event', event);
    console.log('CreateAccountEvent...');
    console.log('========');
    console.log('========');
    console.log('========');
    console.log('========');
    //메세지 큐로 리턴

    if (event.name === 'TestEvent') {
      console.log('TestEvent...');
    }
  }
}
