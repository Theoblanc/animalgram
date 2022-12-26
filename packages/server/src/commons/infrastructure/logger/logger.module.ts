import { Module } from '@nestjs/common';
import { ConsoleLoggerImpl } from './console.logger';

@Module({
  providers: [ConsoleLoggerImpl],
  exports: [ConsoleLoggerImpl]
})
export class LoggerModule {}
