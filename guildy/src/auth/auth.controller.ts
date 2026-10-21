import { Controller, Get, Post, Query, Req, Res, UnauthorizedException, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import type  { Request ,  Response } from 'express';
import { JwtRefreshGuard } from './jwt-refresh-guard';
import { JwtAuthGuard } from './jwt-guard';
import { Throttle } from '@nestjs/throttler';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly auth : AuthService
    ){}
@Throttle({default : {limit : 4 , ttl: 6000}})

@Get('discord')
async authDiscord(){
return await this.auth.discord()

}
@Get('discord/callback', )
async discordCallback( @Query('code') code : string ,
    @Res({passthrough : true })res: Response,){
    
      const tokens =  await this.auth.discordCallback(code)

  res.cookie('access_token', tokens.access_token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
  });

  res.cookie('refresh_token', tokens.refresh_token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
  });

  return res.redirect('http://localhost/upcoming-raids')
}



@UseGuards(JwtRefreshGuard)
@Post('refresh')
async refreshToken(
  @Req() req: Request,
  @Res({ passthrough: true }) res: Response,
) {
  const refreshToken = req.cookies?.refresh_token;

  if (!refreshToken) {
    throw new UnauthorizedException('Refresh token missing');
  }

  const tokens = await this.auth.refreshToken(
    req.user,
    refreshToken,
  );

  res.cookie('access_token', tokens.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });

  res.cookie('refresh_token', tokens.refresh_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });

  return { success: true };
}


@Post('logout')
logout(@Res({ passthrough: true }) res: Response) {
  res.clearCookie('access_token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });

  return { message: 'Logged out successfully' };
}

}

