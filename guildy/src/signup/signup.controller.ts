import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  UseInterceptors,
 
  
} from '@nestjs/common';
import { SignupService } from './signup.service';
import { CreateSignupDto } from './dto/create-signup.dto';
import {  updatePlayerStatusDto, UpdateSignupDto, updateSignupMessageDto } from './dto/update-signup.dto';
import { JwtAuthGuard } from 'src/auth/jwt-guard';
import { Roles } from 'src/rolesGuard/decorator';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Throttle } from '@nestjs/throttler';
import { CacheInterceptor } from '@nestjs/cache-manager';



@Controller('signup')
export class SignupController {
  constructor(
    private readonly  eventEmitter :  EventEmitter2,
    
    private readonly signupService: SignupService) {}
@Throttle({defaul : { ttl : 6000 , limit : 7}})
  @Post('create')
  async createSignup(
    @Body() Body : CreateSignupDto
  ){
    return await this.signupService.createSignup(Body)

  }

  @Post('update')
  async updateSignupMsg(
    @Body() Body : updateSignupMessageDto
  ){
   
    return await this.signupService.updateSignupMessageId(Body.signupId , Body.messageId)

  }
  @UseInterceptors(CacheInterceptor)
  @Post('find')
  async findSign(
    @Body('raidId'
    ) raidId : number
  ){
    
    return await this.signupService.findSignup(raidId)
}
@UseGuards(JwtAuthGuard)
@Post('update/status')
async updatePlayerSta(
  @Body() Body : updatePlayerStatusDto
){
  
return await this.signupService.updatePlayerSignupStatus(Body.signupId, Body.characterId, Body.status)
}

@UseGuards(JwtAuthGuard)
@UseInterceptors(CacheInterceptor)
@Post()

async getSignups(@Body('selectedGuild') selectedGuild : string){
return await  this.signupService.getSignups(selectedGuild)
}

@UseGuards(JwtAuthGuard)
@UseInterceptors(CacheInterceptor)
@Post('player-signup')
async createPlayerSignup (
  
  @Body() Body : any ,
){
  return await this.signupService.createPlayerSignup(Body.signupId , Body.characterId , Body.guildMemberCharacterIds )

}

@UseGuards(JwtAuthGuard)
@Get('guilds/:selectedGuild/channels')
async getGuildChannels(
  @Param('selectedGuild') selectedGuild: string,
) {
  return this.signupService.getGuildChannels(selectedGuild);
}




@Roles('OFFICER')
@UseGuards(JwtAuthGuard)
@Post('delete')
async removeSignup(
  @Body() Body : any,
){
 return await this.signupService.removeSignup(Body.signupId)
}
// title : string , date : string , leader : string , channelId : string , roster : Object
@UseGuards(JwtAuthGuard)
@Post('/roster')
async announceRaid(@Body() Body : any){
 console.log(" Test succesfull")
   const rosterNew = (Body.roster ?? []).map((x) => [
    x.character.name,
    x.character.spec,
  ]);
  

 console.log(rosterNew)
  const result =  this.eventEmitter.emit('signup.created', {
    title : Body.title,
    date : Body.date,
    leader : Body.leader,
    channelId : Body.channelId,
    roster : rosterNew
  })
   console.log(result)
   
   return result
}
@Get('landing')
async landingPage(){
  return await this.signupService.landingPageInfo()
}
}
