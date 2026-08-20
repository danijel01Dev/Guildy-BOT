import { Test, TestingModule } from '@nestjs/testing';
import { BislistService } from './bislist.service';

describe('BislistService', () => {
  let service: BislistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BislistService],
    }).compile();

    service = module.get<BislistService>(BislistService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
