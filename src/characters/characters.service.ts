import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CharactersService {
  constructor(private db: PrismaService) {}
  //
  //
  //
  //
  //
  ////////  Register/create main charachter or alt /////////
  async create(discordId: string, guildId: string, dto: CreateCharacterDto) {
    try {
      /// find user . if there is no user it will create user . Note : User is not in relation with guild !
      let checkUser = await this.db.user.findUnique({ where: { discordId } });
      if (!checkUser) {
        checkUser = await this.db.user.create({
          data: {
            discordId,
          },
        });
      }
      /// Find guild and if there is no guild (bot just joined server ) it will create guild .
      let findGuild = await this.db.guild.findUnique({
        where: { discordGuildId: guildId },
      });
      if (!findGuild) {
        findGuild = await this.db.guild.create({
          data: {
            name: dto.guildName,
            discordGuildId: guildId,
          },
        });
      }

      // find guildMember to continue creation of new Character . Note  guildMember 1:N Characters relation !
      const guildMember = await this.db.guildMember.findUnique({
        where: {
          guildId_userId: {
            guildId: findGuild.id,
            userId: checkUser.id,
          },
        },
      });
      // if there is no guildMember it will create new one and make relation to Guild and User . Also it will create new Character with IsMain : true !
      // First Character name represents guildMember  slug and chars name
      if (!guildMember) {
        const newMember = await this.db.guildMember.create({
          data: {
            slug: dto.slug,
            rank: dto.rank,
            user: {
              connect: {
                id: checkUser.id,
              },
            },
            guild: {
              connect: {
                id: findGuild.id,
              },
            },
            chars: {
              create: {
                name: dto.slug,
                spec: dto.spec,
                isMain: true,
              },
            },
          },
          include: {
            chars: true,
          },
        });
        return newMember;
      }
      // check for existing character to avoid errors
      const existingCharacter = await this.db.character.findUnique({
        where: {
          guildMemberId_name: {
            guildMemberId: guildMember.id,
            name: dto.slug,
          },
        },
      });
      if (existingCharacter) {
        throw new ConflictException('character already exists');
      }
      //  Create character if  User>Guild>GuildMember are created or they already exist .
      const registerChar = await this.db.character.create({
        data: {
          name: dto.slug,
          spec: dto.spec,
          isMain: false,
          guildMember: {
            connect: {
              id: guildMember.id,
            },
          },
        },
      });
      
      return registerChar;
    } catch (err) {
      throw err;
    }
  }
  ////// Find one char 
   async findOneChar(discordId : string , guildId : string , name : string){
    try {
      const checkUser = await this.db.user.findUnique({ where: { discordId } });
      if (!checkUser) {
        throw new NotFoundException('user not found');
      }
      const findGuild = await this.db.guild.findUnique({
        where: { discordGuildId: guildId },
      });
      if (!findGuild) {
        throw new NotFoundException('invalid guild id');
      }
      const findMember = await this.db.guildMember.findUnique({
        where: {
          guildId_userId: {
            guildId: findGuild.id,
            userId: checkUser.id,
          },
        },
      });
      if (!findMember) {
        throw new ConflictException('you must register character first !');
      }

      const character = await this.db.character.findUnique({
        where: {
          guildMemberId_name: {
            guildMemberId: findMember.id,
            name,
          },
        },
      });
       if(!character){ throw new NotFoundException('invalid name ')}
      return character
      }
      catch(err){
        throw err
      }
   }
  //
  //
  //
  //
  ///
  ///
  ///// Update spec  ///////////
  async updateSpec(
    discordId: string,
    guildId: string,
    name: string,
    dto: UpdateCharacterDto,
  ) {
    try {
      const checkUser = await this.db.user.findUnique({ where: { discordId } });
      if (!checkUser) {
        throw new NotFoundException('user not found');
      }
      const findGuild = await this.db.guild.findUnique({
        where: { discordGuildId: guildId },
      });
     
      if (!findGuild) {
        throw new NotFoundException('invalid guild id');
      }
      const findMember = await this.db.guildMember.findUnique({
        where: {
          guildId_userId: {
            guildId: findGuild.id,
            userId: checkUser.id,
          },
        },
      });
     
      if (!findMember) {
        throw new ConflictException('you must register character first !');
      }

      const character = await this.db.character.findUnique({
        where: {
          guildMemberId_name: {
            guildMemberId: findMember.id,
            name,
          },
        },
      });

      if (!character) {
        throw new NotFoundException('Character not found');
      }
      const updateSpec = await this.db.character.update({
        where: { id: character.id },
        data: {
          spec: dto.spec,
        },
      });
     
      return `${updateSpec.name} updated successfully`;
    } catch (err) {
      throw err;
    }
  }
  //
  //
  //
  //
  //
  //
  //
  ////////// Remove char ///////////

  async removeChar(discordId: string, guildId: string, name: string) {
    try {
      const checkUser = await this.db.user.findUnique({ where: { discordId } });
      if (!checkUser) {
        throw new NotFoundException('user not found');
      }
      const findGuild = await this.db.guild.findUnique({
        where: { discordGuildId: guildId },
      });
      if (!findGuild) {
        throw new NotFoundException('invalid guild id');
      }

      /// flow : check User and Guild after that use database id's to find guild Member
      const findMember = await this.db.guildMember.findUnique({
        where: {
          guildId_userId: {
            guildId: findGuild.id,
            userId: checkUser.id,
          },
        },
      });
      if (!findMember) {
        throw new NotFoundException('you must register character first !');
      }

      /// findUnique by using Prisma query
      const character = await this.db.character.findUnique({
        where: {
          guildMemberId_name: {
            guildMemberId: findMember.id,
            name,
          },
        },
      });
     
      if (!character) {
        throw new NotFoundException('Character not found');
      }
      const fixSignups = await this.db.playerSignup.deleteMany({
        where : {
          characterId : character.id
        }
      })
 if(!fixSignups ){ throw new BadRequestException('error there is no signups for this char ')}

      // Very important part  : Main character cannot be deleted because its part of business logic
      if (character.isMain) {
        throw new BadRequestException('Main character cannot be deleted ');
      }
      const removeChar = await this.db.character.delete({
        where: { id: character.id },
      });

      return `${removeChar.name} has successfully removed  `;
    } catch (err) {
      throw err;
    }
  }
  ////////////// List Chars /////////
  async findCharFamily(name: string, guildId: string) {
    /// flow : Use prisma query and find by name and guildId  > it will look for name in guild that user sent bot interaction
   try{ const character = await this.db.character.findFirst({
      where: {
        name: {
          equals: name,
          mode: 'insensitive',
        },
        guildMember: {
          guild: {
            discordGuildId: guildId,
          },
        },
      },
      include: {
        guildMember: {
          include: {
            chars: {
              orderBy: {
                isMain: 'desc', // shows main char on top always
              },
            },
          },
        },
      },
    });

    if (!character) {
      
     throw new NotFoundException(
        `Character "${name}" not found in this guild.`,
      );
    }
    /// it will return  object chars  and   bot logic will map trough object , use join method and  make a string   that places  every string in new row
    ////  Dadix - Holy Paladin
    ////  DadixMage - Fire Mage
    return character.guildMember.chars;}
    catch(err){
      throw err 
    }
  }
  async findUserCharacters(discordId: string, guildId: string) {
  const guildMember = await this.db.guildMember.findFirst({
    where: {
      user: {
        discordId,
      },
      guild: {
        discordGuildId: guildId,
      },
    },
    include: {
      chars: {
        orderBy: {
          isMain: 'desc',
        },
      },
    },
  });

  if (!guildMember) {
    throw new NotFoundException(
      'You are not registered in this guild.',
    );
  }

  return guildMember.chars;
}
}

// 1. funkcija Register  registruje  i potrebno je provjeriti da li je kreiran user > guild member , ako nije kreirati , provjeriti name od charactera da li posotji ako da baciti error ako ne uspjesno kreirati charactera .
// 2. funckija  updateSpec  za update speca na characterima ... potrebno je ime charactera i uspjesno ce se update .
// 3. funckija updateGearScore update gsa  .... implementacija u v2
// 4. funkcija updateName za update nickname u bazi od chara ... input stari nick i tjt
// 4. funkcija RemoveChar potrebna provjera  identiteta
