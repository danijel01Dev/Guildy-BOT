import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSignupDto } from './dto/create-signup.dto';
import { UpdateSignupDto } from './dto/update-signup.dto';
import { PrismaService } from 'src/prisma/prisma.service';

import { Status } from 'generated/prisma/enums';
import { ChannelType, Client } from 'discord.js';

@Injectable()
export class SignupService {
  constructor(private readonly client: Client,
    private db: PrismaService) {}
  async createSignup(dto : CreateSignupDto) {
    
       const findGuild = await this.db.guild.findUnique({where : { discordGuildId : dto.discordGuildId},
       })
       if(!findGuild){ await this.db.guild.create( {
        data : {
          discordGuildId : dto.discordGuildId,
          name : dto.leader,
          
        }
       }
       )}


          const createSignup = await this.db.signup.create({
            data : {
              discordChannelId : dto.discordChannelId,
               discordMessageId : null ,
              title : dto.title,
              date :  dto.date,
              leader : dto.leader,
              note : dto.note,
               guild : {
                connect : {
                  discordGuildId : dto.discordGuildId
                }
               }

              
            },
    
          })
          if(!createSignup){ throw new ConflictException(' failed to create signup')}
          return createSignup
  
  }
 async updateSignupMessageId(signupId : number , messageId : string){

  try{
    const updateSignup = await this.db.signup.update({
      where : {id : signupId},
      data : {
        discordMessageId  : messageId
      }
    })
    return updateSignup
  }
  catch(err){
    throw err
  }
 }
  async createPlayerSignup(
  signupId: number,
  characterId: number,
  guildMemberCharacterIds: number[],
) {
const existing = await this.db.playerSignup.findUnique({
  where: {
    signupId_characterId: {
      signupId,
      characterId,
     }
  },
});

if (!existing) {
  await this.db.playerSignup.create({
    data: {
      signup: {
        connect: { id: signupId },
      },
      character: {
        connect: { id: characterId },
      },
      status: Status.ACTIVE,
    },
  });
} else {
  await this.db.playerSignup.update({
    where: {
      signupId_characterId: {
        signupId,
        characterId,
      },
    },
    data: {
      status: Status.ACTIVE,
    },
  });
}


await this.updatePlayerSignupStatus(
  signupId,
  guildMemberCharacterIds,
  Status.ACTIVE,
);

return this.findSignup(signupId);}

async findSignup(signupId: number) {
  return await this.db.signup.findUnique({
    where: {
      id: signupId,
    },
    include: {
      playerSignups: {
        include: {
          character: {include : {
            guildMember: true,
          }}
        },
      },
    },
  });
  
}
async updatePlayerSignupStatus(
  signupId: number ,
  characterId: number[],
  status : Status,
){
  
  try{
    const updateStatus = await this.db.playerSignup.updateMany({
      where :{
        signupId,
        characterId :{
          in : characterId ,
        },
        
      },
      data : {
        status 
      }
    })
    if(updateStatus.count === 0 ){throw new NotFoundException('signup not found ')}
    return updateStatus;

  }
  catch(err){
    throw err
  }
}
async getSignups(guildId : string){
  const today = new Date();

 


const sevenDaysAgo = new Date(today);
sevenDaysAgo.setDate(today.getDate() - 7);
 

 const test = await  this.db.guild.findUnique({
    where: {
      discordGuildId : guildId
    },
    include: {
      signup: {
        where: {
          createdAt: {
            gte: sevenDaysAgo,
            lte: today,
          },
        },
        include: {
          playerSignups: {
            include: {
              character: {
                include: {
                  guildMember: true,
                },
              },
            },
          },
        },
      },
    },
  });

  return test
}

async getGuildChannels(guildId : string) {

  const guild = await this.client.guilds.fetch(guildId);
  const channels = await guild.channels.fetch();

  return channels
    .filter(
      (channel) =>
        channel &&
        (
          channel.type === ChannelType.GuildText ||
          channel.type === ChannelType.GuildAnnouncement
        ),
    )
    .map((channel) => ({
      id: channel!.id,
      name: channel!.name,
      type: channel!.type,
    }));



}
async removeSignup(signupId: number) {
  return await this.db.$transaction(async (tx) => {
    await tx.playerSignup.deleteMany({
      where: {
        signupId,
      },
    });

    return tx.signup.delete({
      where: {
        id: signupId,
      },
    });
  });
}

async landingPageInfo(){
const guildMembers = await this.db.guildMember.count();
if(!guildMembers) { throw new NotFoundException('there is no guild members registered ')}
const totalSignups = await this.db.signup.count()
if(!totalSignups) { return new NotFoundException('there is no signup created yet')}
const guild = await this.db.guild.count()
if(!guild){ throw new NotFoundException('there is no guild registered yet')}
const dkp = 20
 return {
  guild,
  totalSignups,
  guildMembers,
  dkp
 }
}

}


