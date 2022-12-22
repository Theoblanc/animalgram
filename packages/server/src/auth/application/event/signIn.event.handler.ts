import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { SignInEvent } from 'src/auth/domain/events/signIn.event';
import { IntegrationEventPublisher } from 'src/commons/domain/integration.interface';
import { Inject } from '@nestjs/common';

@EventsHandler(SignInEvent)
export class SignInEventHandler implements IEventHandler<SignInEvent> {
  constructor(
    @Inject('INTEGRATION_EVENT_PUBLISHER')
    private readonly publisher: IntegrationEventPublisher
  ) {}
  async handle(event: SignInEvent) {
    //여기서 subscription 으로 리턴

    //여기서 accesstoken 으로 리턴

    await this.publisher.publish('SIGNINEVENT', {
      accessToken: event.accessToken,
      refreshToken: event.refreshToken
    });
    return;
  }
}
