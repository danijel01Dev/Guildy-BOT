import { Module } from '@nestjs/common';
import { BislistService } from './bislist.service';
import { BislistController } from './bislist.controller';

@Module({
  controllers: [BislistController],
  providers: [BislistService],
})
export class BislistModule {}
