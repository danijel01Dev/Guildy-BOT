import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { JwtAuth } from './jwt-passport';
import { JwtRefresh } from './jwt-refresh.passpot';
import { JwtRefreshGuard } from './jwt-refresh-guard';
import { JwtAuthGuard } from './jwt-guard';

@Module({
  imports : [PrismaModule],
  providers: [AuthService , PrismaService, JwtService, JwtAuth, JwtRefresh, JwtRefreshGuard, JwtAuthGuard,
  ],
  controllers: [AuthController]
})
export class AuthModule {}
