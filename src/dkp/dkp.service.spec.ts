import { Test, TestingModule } from '@nestjs/testing';
import { DkpService } from './dkp.service';

describe('DkpService', () => {
  let service: DkpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DkpService],
    }).compile();

    service = module.get<DkpService>(DkpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
