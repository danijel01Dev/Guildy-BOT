import { Rank } from 'generated/prisma/enums';

import { Spec } from 'generated/prisma/enums';

export class CreateCharacterDto {
  
  slug: string;
  isMain: boolean;
  spec: Spec;
  rank: Rank;
  guildName: string;
  
}
export class CreateCharacterWebDto {
  discordId : string ;
  guildId : string;
  slug: string;
  isMain: boolean;
  spec: Spec;
  rank: Rank;
  guildName: string;
}
export class findByUserDto {
  discordId : string;
  guildId : string;
}


export class findoneCharDto{
  discordId : string;
  guildId : string;
  name : string;

}

export class RemoveCharDto{
  discordId : string ;
  guildId : string;
  name : string;
}
export class findFamilyCharDto {
   name : string;
   guildId : string;
}