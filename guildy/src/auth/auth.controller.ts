import { Controller, Get, Post, Query, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import type  { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly auth : AuthService
    ){}

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

  return res.redirect('http://localhost:5173/upcoming-raids')
}

@Post('refresh')
async refreshToken(
    @Req() req : any,
    @Res({passthrough : true })res: Response
){ const tokens =  await this.auth.refreshToken(req.payload)
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


}


}

