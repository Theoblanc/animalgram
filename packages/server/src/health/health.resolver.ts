import { Args, Resolver, Subscription } from '@nestjs/graphql';

@Resolver()
export class HealthResolver {
  @Subscription(() => String, { name: 'checkHealth' })
  async checkHealth() {
    return 'helth';
  }
}
