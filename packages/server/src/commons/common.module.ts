import { Module } from '@nestjs/common';
import { InfrastructureModule } from './infrastructure/Infrastructure.module';

@Module({
  imports: [InfrastructureModule],
  exports: [InfrastructureModule]
})
export class CommonModule {}
