import { PartialType } from '@nestjs/mapped-types';
import { CreateCharacterDto } from './create-character.dto';
import { Spec } from 'generated/prisma/enums';

export class UpdateCharacterDto extends PartialType(CreateCharacterDto) {
 
  spec: Spec;
}
export class updateSpec{
  dscordId: string;
  guuildId : string;
  name : string;
  spec : Spec;
}
