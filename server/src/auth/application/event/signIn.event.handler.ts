import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { SignInEvent } from 'src/auth/domain/events/signIn.event';

@EventsHandler(SignInEvent)
export class SignInEventHandler implements IEventHandler<SignInEvent> {
  constructor(private jwtService: JwtService) {}
  handle(event: SignInEvent) {
    //여기서 subscription 으로 리턴
  }
}
