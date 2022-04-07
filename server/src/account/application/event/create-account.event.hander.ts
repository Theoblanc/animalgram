import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreateAccountEvent } from 'src/account/domain/event/create-account.event';

@EventsHandler(CreateAccountEvent)
export class CreateAccountEventHandler
  implements IEventHandler<CreateAccountEvent>
{
  handle(event: CreateAccountEvent) {
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
  }
}
