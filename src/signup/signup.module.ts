import { Module } from '@nestjs/common';
import { SignupService } from './signup.service';
import { SignupController } from './signup.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({imports : [PrismaModule],
  controllers: [SignupController],
  providers: [SignupService],
  exports : [SignupService]
})
export class SignupModule {}
