import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  Query,
  ParseIntPipe,
  UseInterceptors,
} from '@nestjs/common';
import { CharactersService } from './characters.service';
import {  CreateCharacterWebDto, findByUserDto, findFamilyCharDto, findoneCharDto, RemoveCharDto } from './dto/create-character.dto';
import {  updateSpec } from './dto/update-character.dto';
import { JwtAuthGuard } from 'src/auth/jwt-guard';
import { Throttle } from '@nestjs/throttler';
import { CacheInterceptor } from '@nestjs/cache-manager';



@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}
  @UseGuards(JwtAuthGuard)
  @Throttle({default : {ttl : 6000 , limit : 15}})
  @Post('create')
  async createChar(
    @Req() req: any,
    @Body() Body: CreateCharacterWebDto
  ){
    return await this.charactersService.create(req.user.name,   req.user.avatar,req.user.discordId, Body.guildId, Body)
  }







@Throttle({default : {ttl : 6000 , limit : 15}})
@UseInterceptors(CacheInterceptor)
@Post('find:id')
async findChar(
  @Req() req : any,
  @Body() Body : findoneCharDto
){
  return await this.charactersService.findOneChar(req.discordId,Body.guildId, Body.name)
}




@Throttle({default : {ttl : 6000 , limit : 12}})
@UseGuards(JwtAuthGuard)
@Patch('update:id')
async updateSpec(
  @Req() req : any,
  @Body() Body : updateSpec
){
  return await this.charactersService.updateSpec(req.user.discordId, Body.guildId, Body.name , Body)
}





@UseGuards(JwtAuthGuard)
@Post('delete')
async deleteChar(
  @Req() req : any,
  @Body() Body : RemoveCharDto
){
 return await this.charactersService.removeChar(req.user.discordId, Body.guildId , Body.name)
}

@UseGuards(JwtAuthGuard)
@UseInterceptors(CacheInterceptor)
@Post('list')
async findCharFamily(
  @Body() Body : findFamilyCharDto
){
  return await this.charactersService.findCharFam(Body.name, Body.guildId)

}

@UseGuards(JwtAuthGuard)
@UseInterceptors(CacheInterceptor)
@Throttle({defaul : {ttl : 6000 , limit : 10}})
@Post('by/user')
async findByUser(
  @Req() req : any ,
  @Body('discordGuildId', ) guildId : string
){
   console.log("REQ USER" , req.user.discordId)
  return await this.charactersService.findUserCharacters(req.user.discordId,guildId)
}


@UseGuards(JwtAuthGuard)
@Post('get/ranks')
async getDiscordRanks(
  @Req() req : any ,
  @Body('discordGuildId', ) guildId : string
){
  
  return await this.charactersService.getRanks(req.discordId,guildId)
}

@UseGuards(JwtAuthGuard)
@Get('guild')
async getGuilds (
    @Req() req: any
){
  return await this.charactersService.getGuilds(req.user.discordId)
}

@UseInterceptors(CacheInterceptor)
@Post('guild-members')
async findGuildMem(
  @Body('body') guildId: string,
) {
  return await this.charactersService.findGuildMembers(guildId);
}

@UseGuards(JwtAuthGuard)
@Post('user-info')
async userInfo(
  @Req() req: any
){
return await this.charactersService.userInformation( req.user.discordId)
}
@Throttle({default : { ttl : 6000 , limit: 20}})
@UseInterceptors(CacheInterceptor)

@Get(':guildId/members')
async getMembers(
  @Param('guildId') guildId : string,
  @Query('page') page : number
){
return await this.charactersService.findGuildMembersBySearch(guildId , page)
}
}
