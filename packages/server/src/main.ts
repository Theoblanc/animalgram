import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppService } from './app.service';
import { ConsoleLoggerImpl } from './commons/infrastructure/logger/console.logger';
import { setupSwagger } from './commons/infrastructure/settings/swagger.setting';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true
  });

  app.useGlobalPipes(new ValidationPipe());
  app.useLogger(app.get(ConsoleLoggerImpl));

  setupSwagger(app);
  await app.listen(AppService.port());
}

void bootstrap();
