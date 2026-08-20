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
import { SignupService } from './signup.service';
import { CreateSignupDto } from './dto/create-signup.dto';
import { findSignupDto, updatePlayerStatusDto, UpdateSignupDto, updateSignupMessageDto } from './dto/update-signup.dto';
import { JwtAuthGuard } from 'src/auth/jwt-guard';

@Controller('signup')
export class SignupController {
  constructor(private readonly signupService: SignupService) {}

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
  @Post('find')
  async findSign(
    @Body() Body: findSignupDto
  ){
    
    return await this.signupService.findSignup(Body.signupId)
}

@Post('update/status')
async updatePlayerSta(
  @Body() Body : updatePlayerStatusDto
){
  
return await this.signupService.updatePlayerSignupStatus(Body.characterId, [Body.signupId], Body.status)
}
@UseGuards(JwtAuthGuard)
@Post()
async getSignups(@Body('selectedGuild') selectedGuild : string){
return await  this.signupService.getSignups(selectedGuild)
}


}
