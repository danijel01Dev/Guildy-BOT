import { Injectable, NotFoundException, Post, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
@Injectable()
export class AuthService {
    constructor(
        private  configService : ConfigService,
        private  db : PrismaService,
        private jwt : JwtService,

    ){}

async  verify(name : string ,discordId : string  ) {
     let  user = await this.db.user.findUnique({where : {discordId}})
     if(!user){ user = await this.db.user.create({
        data : {
            name,
            discordId,
        }
     })}

    const payload = {sub : user.id , discordId : user?.discordId  }

    const access_token = await  this.jwt.signAsync(payload, {secret: this.configService.getOrThrow<string>('JWT_SECRET'), expiresIn : '15m'})
   const refresh_token = await this.jwt.signAsync(payload , { secret: this.configService.getOrThrow<string>('JWT_REFRESH_SECRET') , expiresIn : '7d'})
   const hashToken = await bcrypt.hash(refresh_token , 10 )
   await this.db.user.update({where : { id : user.id
   },
data : {
    refreshToken : hashToken
}})
return {
    access_token,
    refresh_token
}
 }

    async discord( ){
    return  this.configService.getOrThrow<string>('DISCORD_URI');
        
    }
    async discordCallback(code : string ){


        const callDiscordApi = await fetch('https://discord.com/api/oauth2/token', {
            method : 'POST' ,
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded'},
               body :  new URLSearchParams({
          client_id: this.configService.getOrThrow('DISCORD_CLIENT_ID'),
    client_secret: this.configService.getOrThrow('DISCORD_CLIENT_SECRET'),
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: this.configService.getOrThrow('DISCORD_REDIRECT_URI')
        })
            
        })
        if (!callDiscordApi.ok) {
  throw new UnauthorizedException('Discord token exchange failed');
}
         const discordApi = await  callDiscordApi.json()

    const getDiscordApi = await fetch('https://discord.com/api/users/@me',
        {
            headers: {
                Authorization: `Bearer ${discordApi.access_token}`,
            }
        }
    )
if (!getDiscordApi.ok) {
  throw new UnauthorizedException('Discord authentication failed');
}
     const user  =  await getDiscordApi.json()

    const generateJWT =  await this.verify(user.username, user.id )


      return generateJWT
    
    }
    

    
    async refreshToken(req: any) {
        const user = await this.db.user.findUnique({where : {id : req.id }})
        if(!user){ throw new NotFoundException('invalid user')}

        const verifyTokren = await bcrypt.compare(req.refresh_token , user.refreshToken as string )
        if(!verifyTokren){ throw new UnauthorizedException('invalid refresh token')}
     const   payload  = { sub: user.id , discordId : req.discordId}
     const access_token = await  this.jwt.signAsync(payload, {secret: this.configService.getOrThrow<string>('JWT_SECRET'), expiresIn : '15m'})
   const refresh_token = await this.jwt.signAsync(payload , { secret: this.configService.getOrThrow<string>('JWT_REFRESH_SECRET') , expiresIn : '7d'})
   const hashToken = await bcrypt.hash(refresh_token , 10 )
   await this.db.user.update({where : { id : user.id
   },
data : {
    refreshToken : hashToken
}})
return {
    access_token,
    refresh_token
}
    }
   
    

 
}
