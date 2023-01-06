import { ICommand } from '@nestjs/cqrs';

export class CreateVerificationTokenCommand implements ICommand {
  constructor(readonly email: string) {}
}
