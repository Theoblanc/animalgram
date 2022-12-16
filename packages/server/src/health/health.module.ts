import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TerminusModule } from '@nestjs/terminus';
import { InfrastructureModule } from 'src/commons/infrastructure/Infrastructure.module';
import { HealthController } from './health.controller';
import { HealthResolver } from './health.resolver';

@Module({
  imports: [CqrsModule, InfrastructureModule, TerminusModule],
  controllers: [HealthController],
  providers: [HealthResolver]
})
export class HealthModule {}
