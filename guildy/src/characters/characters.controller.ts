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
} from '@nestjs/common';
import { CharactersService } from './characters.service';
import {  CreateCharacterWebDto, findByUserDto, findFamilyCharDto, findoneCharDto, RemoveCharDto } from './dto/create-character.dto';
import {  updateSpec } from './dto/update-character.dto';
import { JwtAuthGuard } from 'src/auth/jwt-guard';

@UseGuards(JwtAuthGuard)

@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}
  @Post('create')
  async createChar(
    @Req() req: any,
    @Body() Body: CreateCharacterWebDto
  ){
    return await this.charactersService.create(req.discord.username,   req.discord.avatar,req.discordId, Body.guildId, Body)
  }







@Post('find')
async findChar(
  @Req() req : any,
  @Body() Body : findoneCharDto
){
  return await this.charactersService.findOneChar(req.discordId,Body.guildId, Body.name)
}






@Patch('update')
async updateSpec(
  @Req() req : any,
  @Body() Body : updateSpec
){
  return await this.charactersService.updateSpec(req.dscordId, Body.guuildId, Body.name , Body)
}






@Delete()
async deleteChar(
  @Req() req : any,
  @Body() Body : RemoveCharDto
){
 return await this.charactersService.removeChar(req.discordId, Body.guildId , Body.name)
}

@UseGuards(JwtAuthGuard)
@Post('list')
async findCharFamily(
  @Body() Body : findFamilyCharDto
){
  return await this.charactersService.findCharFamily(Body.name, Body.guildId)

}
@UseGuards(JwtAuthGuard)
@Post('by/user')
async findByUser(
  @Req() req : any ,
  @Query('discordGuildId', ) guildId : string
){
  
  return await this.charactersService.findUserCharacters(req.discordId,guildId)
}

@UseGuards(JwtAuthGuard)
@Get('guild')
async getGuilds (
    @Req() req: any
){
  return await this.charactersService.getGuilds(req.user.discordId)
}
}
