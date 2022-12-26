import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AppService } from './app.service';
import { ConsoleLoggerImpl } from './commons/infrastructure/logger/console.logger';
import { setupSwagger } from './commons/infrastructure/settings/swagger.setting';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true
  });

  const config = new DocumentBuilder()
    .setTitle('ANIMALGRAM')
    .setDescription('The Anmal API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  app.useGlobalPipes(new ValidationPipe());
  app.useLogger(app.get(ConsoleLoggerImpl));

  setupSwagger(app);
  await app.listen(AppService.port());
}

void bootstrap();
