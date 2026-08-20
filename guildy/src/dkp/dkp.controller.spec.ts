import { Test, TestingModule } from '@nestjs/testing';
import { DkpController } from './dkp.controller';
import { DkpService } from './dkp.service';

describe('DkpController', () => {
  let controller: DkpController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DkpController],
      providers: [DkpService],
    }).compile();

    controller = module.get<DkpController>(DkpController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
