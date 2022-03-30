import { AppService } from './app.service';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';

describe('AppController', () => {
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appService = app.get<AppService>(AppService);
  });

  describe('root', () => {
    it('appService should be defined', () => {
      expect(appService).toBeDefined();
    });
  });

  describe('service', () => {
    it('should return port', () => {
      expect(AppService.port()).toBe(4000);
    });
  });
});
