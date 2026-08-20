import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";


@Injectable()
export class JwtAuth extends PassportStrategy(Strategy , 'jwt'){
    constructor(
        private configService: ConfigService,
    ){
        super({
            jwtFromRequest : (req) => req.cookies.access_token,
             secretOrKey: configService.getOrThrow<string>('JWT_SECRET'),
        })
    }
    async  validate (payload : any){
        return payload; 
    }
}