import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";




@Injectable()
export class JwtRefresh extends PassportStrategy(Strategy , 'jwt-refresh'){
    constructor(
        private configService : ConfigService
    ){
        super({
            jwtFromRequest: (req)=> req.cookies.refresh_token,
            secretOrKey : configService.getOrThrow<string>('JWT_REFRESH_SECRET')
        })
    }
    async validate(payload : any){
        return payload;
    }
}