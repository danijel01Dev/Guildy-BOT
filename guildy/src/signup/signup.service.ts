import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSignupDto } from './dto/create-signup.dto';
import { UpdateSignupDto } from './dto/update-signup.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { connect } from 'node:http2';
import { Status } from 'generated/prisma/enums';

@Injectable()
export class SignupService {
  constructor(private db: PrismaService) {}
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
          in : characterId,
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

  console.log(today)


const sevenDaysAgo = new Date(today);
sevenDaysAgo.setDate(today.getDate() - 7);
  console.log(guildId)

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
  console.log(test)
  return test
}

}


