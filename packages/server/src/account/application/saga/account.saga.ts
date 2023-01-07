import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AccountSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(this.constructor.name);
  }
}
