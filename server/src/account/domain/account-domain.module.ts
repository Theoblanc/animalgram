import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AccountFactory } from './account.factory';

const providers: Provider[] = [
  // factories
  AccountFactory,
];

@Module({
  imports: [CqrsModule],
  providers,
  exports: providers,
})
export class DomainModule {}
