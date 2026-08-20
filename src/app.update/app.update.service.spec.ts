import { Test, TestingModule } from '@nestjs/testing';
import { AppUpdateService } from './app.update.service';

describe('AppUpdateService', () => {
  let service: AppUpdateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppUpdateService],
    }).compile();

    service = module.get<AppUpdateService>(AppUpdateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
