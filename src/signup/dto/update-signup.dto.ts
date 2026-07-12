import { PartialType } from '@nestjs/mapped-types';
import { CreateSignupDto } from './create-signup.dto';
import { isNumber } from 'node:util';
import { Status } from 'generated/prisma/enums';

export class UpdateSignupDto extends PartialType(CreateSignupDto) {

}

export class findSignupDto {
    
     signupId : number;
}
export class updatePlayerStatusDto {

  signupId : number;
  characterId : number;
  status : Status;
}
export class updateSignupMessageDto {
    signupId : number;
    messageId : string;
}