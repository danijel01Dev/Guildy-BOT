import { Test, TestingModule } from '@nestjs/testing';
import { BislistController } from './bislist.controller';
import { BislistService } from './bislist.service';

describe('BislistController', () => {
  let controller: BislistController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BislistController],
      providers: [BislistService],
    }).compile();

    controller = module.get<BislistController>(BislistController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
