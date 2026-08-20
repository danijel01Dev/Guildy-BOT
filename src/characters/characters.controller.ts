import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { CharactersService } from './characters.service';
import {  CreateCharacterWebDto, findByUserDto, findFamilyCharDto, findoneCharDto, RemoveCharDto } from './dto/create-character.dto';
import {  updateSpec } from './dto/update-character.dto';


@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}
  @Post('create')
  async createChar(
    @Req() req: any,
    @Body() Body: CreateCharacterWebDto
  ){
    return await this.charactersService.create(req.discordId, Body.guildId, Body)
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


@Post('list')
async findCharFamily(
  @Body() Body : findFamilyCharDto
){
  return await this.charactersService.findCharFamily(Body.name, Body.guildId)

}

@Post('by/user')
async findByUser(
  @Req() req : any ,
  @Body() Body : findByUserDto
){
  
  return await this.charactersService.findUserCharacters(req.discordId,Body.guildId)
}
}
