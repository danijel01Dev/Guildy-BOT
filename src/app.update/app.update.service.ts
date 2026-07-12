import { BadRequestException, ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Client,
  EmbedBuilder,
  ModalBuilder,
  StringSelectMenuBuilder,
  TextChannel,
  TextInputBuilder,
  TextInputStyle,
} from 'discord.js';
import * as necord from 'necord';
import { Rank, Spec, Status } from 'generated/prisma/enums';
import { CharactersService } from 'src/characters/characters.service';
import { deleteChar, findCharName } from './register.Char.Dto';
import { CreateSignupDto } from './createSignup.dto';
import { SignupService } from 'src/signup/signup.service';

@Injectable()
export class AppUpdateService {
  private readonly logger = new Logger(AppUpdateService.name);
  public constructor(
    private readonly client: Client,
    private char: CharactersService,
    private signup : SignupService,
    
  ) {}
////
///
////.   --------- Register Char  /register-char
///
////
////
  @necord.SlashCommand({
    name: 'register-char',
    description: 'register character',
  })
  public async registerChar(
    @necord.Context() [interaction]: necord.SlashCommandContext,
  ) {
    const select = new StringSelectMenuBuilder()
      .setCustomId('register-class')
      .setPlaceholder('Choose your class')
      .addOptions(
        ...Object.keys(CLASS_SPECS).map((className) => ({
          label: CLASS_LABELS[className] ?? className,
          value: className,
        })),
      );

    const row = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
      select,
    );

    await interaction.reply({
      content: 'Choose your class',
      components: [row],
      ephemeral: true,
    });
  }
  ////
  ///
  //
  //
  // ------------   Register char >>>>  select class string select 
  //
  //
  //
  ///
  @necord.StringSelect('register-class')
  public async selectClass(
    @necord.Context() [interaction]: necord.StringSelectContext,
    @necord.SelectedStrings() values: string[],
  ) {
    const className = values[0] as keyof typeof CLASS_SPECS;
    const classSpecs: Spec[] = CLASS_SPECS[className];

    const select = new StringSelectMenuBuilder()
      .setCustomId('register-spec')
      .setPlaceholder('Choose your spec')
      .addOptions(
        ...classSpecs.map((spec) => ({
          label: SPEC_LABELS[spec],
          value: spec,
        })),
      );

    const row = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
      select,
    );

    await interaction.reply({
      content: `Choose your ${CLASS_LABELS[className] ?? className} spec`,
      components: [row],
      ephemeral: true,
    });
  }
  //
  //
  //
  //
  //
  // ======. Register char >> class select  >>  Register spec string select !
  //
  //
  //
  @necord.StringSelect('register-spec')
  public async selectSpec(
    @necord.Context() [interaction]: necord.StringSelectContext,
    @necord.SelectedStrings() values: string[],
  ) {
    const spec = values[0] as Spec;

    const nameInput = new TextInputBuilder()
      .setCustomId('character-name')
      .setLabel('Character name')
      .setPlaceholder('Enter character name')
      .setStyle(TextInputStyle.Short)
      .setMinLength(2)
      .setMaxLength(24)
      .setRequired(true);

    const row = new ActionRowBuilder<TextInputBuilder>().addComponents(
      nameInput,
    );

    const modal = new ModalBuilder()
      .setCustomId(`register-char-name/${spec}`)
      .setTitle('Register character')
      .addComponents(row);

    await interaction.showModal(modal);
  }
//
//
//
//
//
//
// ======= Register char > class select > spec select >>> Modal with name input !
//
//
//
//
  @necord.Modal('register-char-name/:spec')
  public async registerCharacterName(
    @necord.Context() [interaction]: necord.ModalContext,
    @necord.ModalParam('spec') spec: Spec,
    @necord.Fields('character-name') characterName: string,
  ) {
    if (!interaction.guildId) {
      await interaction.reply({
        content: 'Character registration must be done in a server.',
        ephemeral: true,
      });
      return;
    }
  try{
     const createChar = await this.char.create(
      interaction.user.id,
      interaction.guildId,
      {
        slug: characterName,
        isMain: false,
        spec,
        rank: Rank.MEMBER,
        guildName: interaction.guild?.name ?? 'Unknown Guild',
      },
    );
  
    await interaction.reply({
      content: `${characterName}  successfully registered`,
      ephemeral: true,
    });
  }
  catch(err){
    if(err instanceof ConflictException){
      await interaction.reply({
        content : 'Character already exists',
        ephemeral : true,
    })
    
    }
  }
  }
  //
  //
  //
  //
  //
  // ------------- /find-char  input : name --------
  //
  //
  //
  // 
  @necord.SlashCommand({
    name: 'find-char',
    description: 'Find Character',
  })
  public async findChar(
    @necord.Context() [interaction]: necord.SlashCommandContext,
    @necord.Options() options: findCharName,
  ) {
      try{const { name } = options;
    const guildId = interaction.guildId as string;
    const findCharName = await this.char.findCharFamily(name, guildId);

    const charMap = findCharName.map(
      (x) => `${x.name} - ${SPEC_LABELS[x.spec]}`,
    );

  const replyChars = charMap.join('\n');
    await interaction.reply({
      content: String(replyChars),
      ephemeral: true,
    });}
    catch(err){
       if(err instanceof NotFoundException){
        await interaction.reply({
          content: 'Invalid Char Name',
          ephemeral : true,
        })
       }
    }
  }
 

//
//
//
//
//
//
//
//
//
//.    <---- Remove char  input : name ---->
//
//
//
//
//
//
//
//

    
  @necord.SlashCommand({
    name: 'remove-char',
    description: 'Remove Char',
  })
  public async deleteChar(
    @necord.Context() [interaction]: necord.SlashCommandContext,
    @necord.Options() options: deleteChar,
  ) {
    try{console.log('remove char called')
      const { name } = options;
    const guildId = interaction.guildId as string;
    const discordId = interaction.user.id;
    const removeChar = await this.char.removeChar(discordId, guildId, name);
  console.log('1')
    await interaction.reply({
      content: removeChar,
      ephemeral: true,
    });}
    catch(err){
      
      if (err instanceof NotFoundException) {
    return interaction.reply({
      content: 'Invalid Char Name ',
      ephemeral: true,
    });
  }

  if (err instanceof BadRequestException) {
    return interaction.reply({
      content: err.message,
      ephemeral: true,
    });
  }

  console.error(err);

  return interaction.reply({
    content: 'Unexpected error.',
    ephemeral: true,
  });

  ;
    }
  }
  //
  //
  //
  //
  //
  //
  //
  //
  //.  <-----  Update Spec    input : name  >>>  String Select menu with 3-4 specs ------>
  //
  //
  //
  @necord.SlashCommand({
    name : 'update-spec',
    description : 'Update Spec'
  })
  public async updateSpec(
    @necord.Context() [interaction] : necord.SlashCommandContext,
    @necord.Options() options : findCharName
  ){ 
  try{   const discordId = interaction.user.id;
     const guildId = interaction.guildId as string;
     const {name} = options;
      

     const findChar = await this.char.findOneChar(discordId , guildId , name)
     if(!findChar) { throw new Error('char not found')}
     const classKey = Object.keys(CLASS_SPECS).find((key) =>
  CLASS_SPECS[key].includes(findChar.spec),)
     if(!classKey){ throw new Error('Class not found')}
;
    const newPlateBuilder = new StringSelectMenuBuilder()
  .setCustomId('pick-spec')
  .setPlaceholder('Choose your spec')
  .addOptions(
    CLASS_SPECS[classKey].map((spec) => ({
      label: SPEC_LABELS[spec],
      value: `${name}:${spec}`,
    })),
  );

const row = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
  newPlateBuilder,
);

await interaction.reply({
  content: `Choose your ${CLASS_LABELS[classKey]} spec`,
  components: [row],
  ephemeral: true,
});;}
catch(err){
  if(err instanceof NotFoundException){
    await interaction.reply({
      content : ' Invalid Char Name',
      ephemeral : true,
    })
  }
  if(err instanceof ConflictException){
     await interaction.reply({
      content : 'Register your char first !',
      ephemeral : true,
     })
  }
  console.log(err)
}
}

@necord.StringSelect('pick-spec')
public async pickSpec(
  @necord.Context() [interaction]: necord.StringSelectContext,
) {
  const [name, spec] = interaction.values[0].split(':');

  await this.char.updateSpec(
    interaction.user.id,
    interaction.guildId!,
    name,
    {
      spec: spec as Spec,
    },
  );

  await interaction.update({
    content: `${name} updated successfully.`,
    components: [],
  });
};



//
//
//
//
//
//
//
//.  <---- Create Signup flow  : Modal(input : title , date , leader ,note) 
//
//
//
//
//
//

@necord.SlashCommand({
  name : 'create-signup',
  description : 'Create Signup'
})
public async createSignup(
  @necord.Context() [interaction] : necord.SlashCommandContext,
  
  ){
    try{
  


      const title = new TextInputBuilder()
      .setCustomId('signup-title')
      .setLabel('Signup Title')
      .setPlaceholder('Enter title')
      .setStyle(TextInputStyle.Short)
      .setMinLength(2)
      .setMaxLength(24)
      .setRequired(true);

      const date = new TextInputBuilder()
      .setCustomId('signup-date')
      .setLabel('Signup Date')
      .setPlaceholder('Enter Signup Date')
      .setStyle(TextInputStyle.Short)
      .setMinLength(2)
      .setMaxLength(24)
      .setRequired(true);

      const leader = new TextInputBuilder()
      .setCustomId('signup-leader')
      .setLabel('Enter Leader Name')
      .setPlaceholder('Enter Leader Name')
      .setStyle(TextInputStyle.Short)
      .setMinLength(2)
      .setMaxLength(24)
      .setRequired(true);

      const note = new TextInputBuilder()
      .setCustomId('signup-note')
      .setLabel('Signup Note')
      .setPlaceholder('Enter note')
      .setStyle(TextInputStyle.Short)
      .setMinLength(2)
      .setMaxLength(100)
      .setRequired(true);
       
      
      const row1= new ActionRowBuilder<TextInputBuilder>().addComponents(title
    );
    const row2= new ActionRowBuilder<TextInputBuilder>().addComponents(date
    );
    const row3= new ActionRowBuilder<TextInputBuilder>().addComponents(leader
    );
    const row4= new ActionRowBuilder<TextInputBuilder>().addComponents(note
    );
   
   

    const modal = new ModalBuilder()
      .setCustomId(`create-signup`)
      .setTitle('Create Signup')
      .addComponents(row1, row2 ,row3 , row4);

    await interaction.showModal(modal);
    }
    catch(err){
      throw err
    }}
     @necord.Modal('create-signup')
      public async onCreateSignup(
        @necord.Context() [interaction]  : necord.ModalContext
      ){
      try{ const title = interaction.fields.getTextInputValue('signup-title');
  const date = interaction.fields.getTextInputValue('signup-date');
  const leader = interaction.fields.getTextInputValue('signup-leader');
  const discordGuildId = interaction.guildId!
  const discordChannelId = interaction.channelId!
  const note = interaction.fields.getTextInputValue('signup-note');
  const discordMessageId = ''
  const dto = { date ,leader , note, discordGuildId, discordChannelId, title , discordMessageId}
  const createSignup = await this.signup.createSignup( dto)
   
   
   const embed = new EmbedBuilder()
  .setTitle(createSignup.title)
  .setDescription(note)
  .addFields(
    { name: '📅 Date', value: `${createSignup.date}`  },
    {
        name: '━━━━━━━━━━━━━━━━━━',
        value: '\u200B',
      },
    { name: '👑 Leader', value: `${createSignup.leader}`  },
    {
        name: '━━━━━━━━━━━━━━━━━━',
        value: '\u200B',
      },
    { name: '👥 Signed', value: '0 / 40', },
    {
        name: '━━━━━━━━━━━━━━━━━━',
        value: '\u200B',
      },
  )
  .setFooter({ text: 'Guildy' })
  .setTimestamp();
  const buttons = new ActionRowBuilder<ButtonBuilder>().addComponents(
  new ButtonBuilder()
    .setCustomId(`signup-join/${createSignup.id}`)
    .setLabel('🎯 Sign Up')
    .setStyle(ButtonStyle.Success),
  
  new ButtonBuilder()
    .setCustomId(`signup-absence/${createSignup.id}`)
    .setLabel('⛔ Absence')
    .setStyle(ButtonStyle.Danger),
  new ButtonBuilder()
  .setCustomId(`signup-bench/${createSignup.id}`)
  .setLabel('Bench')
  .setEmoji({
    id: '1521237056855081081',
    name : 'emojiscomebench'
  })
  .setStyle(ButtonStyle.Secondary),
  new ButtonBuilder()
  .setCustomId(`signup-tentative/${createSignup.id}`)
  .setLabel('🤔 Tentative')
  .setStyle(ButtonStyle.Secondary)
  
);
  const discordChannel = interaction.channel as TextChannel
  const message = await discordChannel.send({
    content : '@everyone',
  embeds: [embed],
  components: [buttons]
});

const saveMessageId = await this.signup.updateSignupMessageId(createSignup.id , message.id)
  
await interaction.reply({
  content : `Signup created ${saveMessageId.title}`,
  ephemeral : true,
})

      }
      catch(err){
        throw err
      }
      }
      //
      //
      //. <---- Signup-absecne button   : it will change all  chars status to absence  connected to
      //  guildMember that interacted.  ---->
      //
      //
      //
      //
      //
      //
      //
      //
      // 
@necord.Button('signup-absence/:signupId')
 public async signupAbsence(
  @necord.Context() [interaction] : necord.ButtonContext
 ){try{
 const signupId = interaction.customId.split('/')[1];
 const  guildId = interaction.guildId;
 if(!guildId){ throw new NotFoundException('guild not found')}
 const discordId = interaction.user.id;
 if(!discordId){throw new NotFoundException('discordId not found')}
   const findGuildMember = await this.char.findUserCharacters(discordId, guildId)
   if(!findGuildMember){ throw new NotFoundException('chars not found for this user')}
   const updateStatus = await this.signup.updatePlayerSignupStatus(Number(signupId) , findGuildMember.map((x) => x.id), Status.ABSENCE)
    if(!updateStatus){ throw new NotFoundException('signup not found ')}
  
    const signup = await this.signup.findSignup(Number(signupId));

  if (!signup) {
    throw new NotFoundException('Signup not found.');
  }
   
  const channel = await this.client.channels.fetch(
    signup.discordChannelId,
  );

  if (!channel || !channel.isTextBased()) {
    throw new NotFoundException('Discord channel not found.');
  }

  const message = await (channel as TextChannel).messages.fetch(
    signup.discordMessageId!,
  );

  await message.edit({
    embeds: [this.buildSignupEmbed(signup)],
  });
  
  await interaction.reply({
    content: 'Absence status updated successfully.',
    ephemeral : true,
  });}
  catch(err){
    if(err instanceof NotFoundException)
      await interaction.reply({
    content : 'signup not found or you are not registered in this guild',
  ephemeral : true,})
      if(err instanceof ConflictException){
    await interaction.reply({
        content : 'signup not found or you are not registered in this guild',
  ephemeral : true,
      
      })
      
    }}}

    //
    //
    //
    //
    //
    //
    //
    //
    // <------------ Signup - bench button : it will change all chars status to becnc connected to guildMember . ------ >
    //
    //
    //
    //
    //
    //
    //
    //
    //

  
  @necord.Button('signup-bench/:signupId')
 public async signupBench(
  @necord.Context() [interaction] : necord.ButtonContext
 ){try{
 const signupId = interaction.customId.split('/')[1];
 const  guildId = interaction.guildId;
 if(!guildId){ throw new NotFoundException('guild not found')}
 const discordId = interaction.user.id;
 if(!discordId){throw new NotFoundException('discordId not found')}
   const findGuildMember = await this.char.findUserCharacters(discordId, guildId)
   if(!findGuildMember){ throw new NotFoundException('chars not found for this user')}
   const updateStatus = await this.signup.updatePlayerSignupStatus(Number(signupId) , findGuildMember.map((x) => x.id), Status.BENCH)
    if(!updateStatus){ throw new NotFoundException('signup not found ')}
  
    const signup = await this.signup.findSignup(Number(signupId));

  if (!signup) {
    throw new NotFoundException('Signup not found.');
  }
   
  const channel = await this.client.channels.fetch(
    signup.discordChannelId,
  );

  if (!channel || !channel.isTextBased()) {
    throw new NotFoundException('Discord channel not found.');
  }

  const message = await (channel as TextChannel).messages.fetch(
    signup.discordMessageId!,
  );

  await message.edit({
    embeds: [this.buildSignupEmbed(signup)],
  });
  
  await interaction.reply({
    content: ' Bench status updated successfully.',
    ephemeral : true,
  });}
  catch(err){
    if(err instanceof NotFoundException)
      await interaction.reply({
    content : 'signup not found or you are not registered in this guild',
  ephemeral : true,})
      if(err instanceof ConflictException){
    await interaction.reply({
        content : 'signup not found or you are not registered in this guild',
  ephemeral : true,
      
      })
      
    }}}
  
 //
 //
 //
 //
 //
 //
 //.  <----- Tentative button : it will change all chars status to tentative connected to guildMember that interacted. --- >
 //
 //
 //
 //
 @necord.Button('signup-tentative/:signupId')
 public async signupTentative(
  @necord.Context() [interaction] : necord.ButtonContext
 ){try{
 const signupId = interaction.customId.split('/')[1];
 const  guildId = interaction.guildId;
 if(!guildId){ throw new NotFoundException('guild not found')}
 const discordId = interaction.user.id;
 if(!discordId){throw new NotFoundException('discordId not found')}
   const findGuildMember = await this.char.findUserCharacters(discordId, guildId)
   if(!findGuildMember){ throw new NotFoundException('chars not found for this user')}
   const updateStatus = await this.signup.updatePlayerSignupStatus(Number(signupId) , findGuildMember.map((x) => x.id), Status.TENTATIVE)
    if(!updateStatus){ throw new NotFoundException('signup not found ')}
  
    const signup = await this.signup.findSignup(Number(signupId));

  if (!signup) {
    throw new NotFoundException('Signup not found.');
  }
   
  const channel = await this.client.channels.fetch(
    signup.discordChannelId,
  );

  if (!channel || !channel.isTextBased()) {
    throw new NotFoundException('Discord channel not found.');
  }

  const message = await (channel as TextChannel).messages.fetch(
    signup.discordMessageId!,
  );

  await message.edit({
    embeds: [this.buildSignupEmbed(signup)],
  });
  
  await interaction.reply({
    content: ' Tentative status updated successfully.',
    ephemeral : true,
  });}
  catch(err){
    if(err instanceof NotFoundException)
      await interaction.reply({
    content : 'signup not found or you are not registered in this guild',
  ephemeral : true,})
      if(err instanceof ConflictException){
    await interaction.reply({
        content : 'signup not found or you are not registered in this guild',
  ephemeral : true,
      
      })
      
    }}}
  
 
  


 ////
 ////
 ///
 //
 // < ----- Signup-join button : it will create new table with SignupPlayer   --->
 //
 //
 //
     @necord.Button('signup-join/:signupId')
public async signupJoin(
  @necord.Context() [interaction]: necord.ButtonContext,
) {try{
  const signupId = interaction.customId.split('/')[1];

  const chars = await this.char.findUserCharacters(
    interaction.user.id,
    interaction.guildId!,
  );
  
  if(!chars || chars.length === 0){ throw new NotFoundException('You dont have registered chars  ')}

  const select = new StringSelectMenuBuilder()
    .setCustomId(`signup-character/${signupId}`)
    .setPlaceholder('Choose your character')
    .addOptions(
      chars.map((char) => ({
        label: char.name,
        description: SPEC_LABELS[char.spec],
        value: String(char.id),
      })),
    );

  const row =
    new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(select);

  await interaction.reply({
    content: 'Choose your character',
    components: [row],
    ephemeral: true,
  });}
  catch(err){
    if(err instanceof NotFoundException){
      await interaction.reply({
        content : 'You dont have registered chars in this guild ',
        ephemeral: true,
      })
    }
  }
}
@necord.StringSelect('signup-character/:signupId')
public async signupCharacter(
  @necord.Context() [interaction]: necord.StringSelectContext,
) {
 try{ const signupId = Number(interaction.customId.split('/')[1]);
  const characterId = Number(interaction.values[0]);
  const chars = await this.char.findUserCharacters(
    interaction.user.id,
    interaction.guildId!,
  );
  if(!chars || chars.length === 0){ throw new NotFoundException('You dont have registered chars  ')}


 const signup =  await this.signup.createPlayerSignup(signupId, characterId, chars.map((x)=> x.id) );



  if (!signup) {
    throw new NotFoundException('Signup not found.');
  }
   
  const channel = await this.client.channels.fetch(
    signup.discordChannelId,
  );

  if (!channel || !channel.isTextBased()) {
    throw new NotFoundException('Discord channel not found.');
  }

  const message = await (channel as TextChannel).messages.fetch(
    signup.discordMessageId!,
  );

  await message.edit({
    embeds: [this.buildSignupEmbed(signup)],
  });

  await interaction.update({
    content: '✅ Successfully signed up.',
    components: [],
  });}
  catch(err){
     if(err instanceof ConflictException){
      await interaction.update({
        content : 'character already signed up ',
        components : [],
      })
      
     }
  }
}

  private buildSignupEmbed(signup: any) {
  const uniqueMembers = new Set(
    signup.playerSignups.map(
      (x: any) => x.character.guildMemberId,
    ),
  );

  const grouped = new Map<Spec, string[]>();
   const   absencePlayer : string[]= [];
   const    benchPlayer : string[] = [];
   const tentativePlayer : string [] = [];  
for (const player of signup.playerSignups) {
  if(player.status === Status.ABSENCE){

  }
  if(!player.character){continue}
  switch(player.status){
    case Status.ABSENCE: 
    absencePlayer.push(player.character.name);
    continue;
    case Status.BENCH:
    benchPlayer.push(player.character.name);
    continue;
    case Status.TENTATIVE:
      tentativePlayer.push(player.character.name);
      continue;
      case Status.ACTIVE:
        break;
        default : continue;
  }

  const spec = player.character.spec;
  if (!grouped.has(spec)) {
    grouped.set(spec, []);
  }

  grouped.get(spec)!.push(player.character.name);

  }

  const embed = new EmbedBuilder()
    .setColor(0x4f8ef7)
    .setTitle(`❄️ ${signup.title}`)
    .setDescription(`📝 **${signup.note}**`)
    .setThumbnail('http://localhost:3060/Lichking2492494.webp'
      )
    .addFields(
      {
        name: '━━━━━━━━━━━━━━━━━━',
        value: '\u200B',
      },
      {
        name: '📅 Raid Date',
        value: signup.date,
        inline: true,
      },
      {
        name: '━━━━━━━━━━━━━━━━━━',
        value: '\u200B',
      },
      {
        name: '👑 Raid Leader',
        value: signup.leader,
        inline: true,
      },
      {
        name: '━━━━━━━━━━━━━━━━━━',
        value: '\u200B',
      },
      {
        name: '👥 Signed',
        value: `${uniqueMembers.size}/40`,
        inline: true,
      },
      {
        name: '━━━━━━━━━━━━━━━━━━',
        value: '\u200B',
      },
    );

  const classOrder = [
    'PALADIN',
    'WARRIOR',
    'DEATH_KNIGHT',
    'HUNTER',
    'MAGE',
    'PRIEST',
    'DRUID',
    'SHAMAN',
    'ROGUE',
    'WARLOCK',
  ];

  for (const cls of classOrder) {
  let value = '\u200B\n';

  for (const spec of CLASS_SPECS[cls as keyof typeof CLASS_SPECS]) {
    const players = grouped.get(spec);

    if (!players?.length) continue;

    for (const player of players) {
      value += `${SPEC_EMOJIS[spec]} ${player}\n`;
    }
  }

  if (value === '\u200B\n') continue;

  embed.addFields({
    name: `${CLASS_EMOJIS[cls as keyof typeof CLASS_EMOJIS]} ${CLASS_LABELS[cls]}`,
    value: value.trimEnd(),
    inline: true,
  })
  }
embed.addFields(
  {
    name: '🪑 Bench',
    value: benchPlayer.length ? benchPlayer.join('\n') : '-',
    inline: true,
  },
  {
    name: '❔ Tentative',
    value: tentativePlayer.length ? tentativePlayer.join('\n') : '-',
    inline: true,
  },
  {
    name: '❌ Absence',
    value: absencePlayer.length ? absencePlayer.join('\n') : '-',
    inline: true,
  },
);

  embed
    .setFooter({
      text: 'Guildy • Wrath of the Lich King',
    })
    .setTimestamp();

  return embed;
}
}
export const CLASS_EMOJIS = {
  PALADIN: '<:paladin:1520908540636827799>',
  WARRIOR: '<:warrior:1520908780437508106>',
  DEATH_KNIGHT: '<:wow_Death_Knight31:1520908654864240730>',
  HUNTER: '<:hunter:1520909087737512047>',
  MAGE: '<:wow_Mage:1520908653794951248>',
  PRIEST: '<:priest:1520908656143761670>',
  DRUID: '<:Druid:1520908652251189479>',
  SHAMAN: '<:shaman:1520909086445801557>',
  ROGUE: '<:rogue:1520908539676065963>',
  WARLOCK: '<:wl:1520909085162209280>',
} as const;

const CLASS_LABELS: Record<string, string> = {
  PALADIN: 'Paladin',
  WARRIOR: 'Warrior',
  DEATH_KNIGHT: 'Death Knight',
  HUNTER: 'Hunter',
  MAGE: 'Mage',
  PRIEST: 'Priest',
  DRUID: 'Druid',
  SHAMAN: 'Shaman',
  ROGUE: 'Rogue',
  WARLOCK: 'Warlock',
};
const BENCH_EMOJIS  = 
  '<:emojiscombench:1521237056855081081>';
const SPEC_EMOJIS: Record<Spec, string> = {
  PROT_PALADIN: '<:paladin_protection:1521222979990589584>',
  PROT_WARRIOR: '<:warrior_prot:1521223530547777746>',
  BEAR: '<:druid_guardian:1521222653958946846> ',

  HOLY_PALADIN: '<:paladin_holy:1521222952429944892>',
  RETRI_PALADIN: '<:paladin:1520908540636827799>',
  HOLY_PRIEST: '<:priest_holy:1521223108680220803>',
  SHADOW_PRIEST: '<:priest_shadow:1521228213349646376>',
  DISC_PRIEST: '<:priest_disc:1521223084919623760>',

  BLOOD_DK: '<:dk_blood:1521222135488577597>',
  FROST_DK: '<:dk_frost:1521222551559209181>',
  UNHOLY_DK: '<:dk_unholy:1521222575106035712>',

  BM_HUNTER: '<:hunter_bm:1521222714063323257>',
  MM_HUNTER:  '<:hunter_mm:1521222763329753097>',
  SURV_HUNTER: '<:hunter_survival:1521222785026883645>',

  FROST_MAGE: '<:mage_frost:1521222922746855535>',
  FIRE_MAGE: '<:mage_fire:1521222894624178347>',
  ARCANE_MAGE: '<:mage_arcane:1521222861899956416>',

  FERAL_DRUID: '<:druid_feral:1521222629493575720>',
  BALANCE_DRUID: '<:druid_balance:1521222601580482713>',
  RESTO_DRUID: '<:druid_resto:1521222682111115425>',

  RESTO_SHAMAN: '<:shaman_resto:1521223353296228352>',
  ENHA_SHAMAN: '<:shaman_enhancement:1521223325785915524>',
  ELE_SHAMAN: '<:shaman_elem:1521223296014749806>',

  COMBAT_ROGUE: '<:rogue:1520908539676065963>',
  ASSASSIN_ROGUE: '<:rogue_assa:1521223217287663616>',
  SUB_ROGUE: '<:rogue_sub:1521223264221794356>',

  FURY_WARRIOR: '<:warrior_fury:1521223503376814221>',
  ARMS_WARRIOR: '<:warrior_arms:1521223478211117268>',

  DEMO_WARLOCK: '<:warlock_demono:1521223409688907847>',
  AFFLI_WARLOCK: '<:warlock_affli:1521223381226225756>',
  DESTRO_WARLOCK: '<:warlock_destru:1521223447332651235>',
};
const SPEC_LABELS: Record<Spec, string> = {
  PROT_PALADIN: 'Protection Paladin',
  PROT_WARRIOR: 'Protection Warrior',
  BEAR: 'Bear Druid',

  HOLY_PALADIN: 'Holy Paladin',
  RETRI_PALADIN: 'Retribution Paladin',
  HOLY_PRIEST: 'Holy Priest',
  SHADOW_PRIEST: 'Shadow Priest',
  DISC_PRIEST: 'Discipline Priest',

  BLOOD_DK: 'Blood DK',
  FROST_DK: 'Frost DK',
  UNHOLY_DK: 'Unholy DK',

  BM_HUNTER: 'Beast Mastery Hunter',
  MM_HUNTER: 'Marksmanship Hunter',
  SURV_HUNTER: 'Survival Hunter',

  FROST_MAGE: 'Frost Mage',
  FIRE_MAGE: 'Fire Mage',
  ARCANE_MAGE: 'Arcane Mage',

  FERAL_DRUID: 'Feral Druid',
  BALANCE_DRUID: 'Balance Druid',
  RESTO_DRUID: 'Restoration Druid',

  RESTO_SHAMAN: 'Restoration Shaman',
  ENHA_SHAMAN: 'Enhancement Shaman',
  ELE_SHAMAN: 'Elemental Shaman',

  COMBAT_ROGUE: 'Combat Rogue',
  ASSASSIN_ROGUE: 'Assassination Rogue',
  SUB_ROGUE: 'Subtlety Rogue',

  FURY_WARRIOR: 'Fury Warrior',
  ARMS_WARRIOR: 'Arms Warrior',

  DEMO_WARLOCK: 'Demonology Warlock',
  AFFLI_WARLOCK: 'Affliction Warlock',
  DESTRO_WARLOCK: 'Destruction Warlock',
};
const CLASS_SPECS = {
  PALADIN: [Spec.PROT_PALADIN, Spec.HOLY_PALADIN, Spec.RETRI_PALADIN],

  WARRIOR: [Spec.PROT_WARRIOR, Spec.FURY_WARRIOR, Spec.ARMS_WARRIOR],

  DEATH_KNIGHT: [Spec.BLOOD_DK, Spec.FROST_DK, Spec.UNHOLY_DK],

  HUNTER: [Spec.BM_HUNTER, Spec.MM_HUNTER, Spec.SURV_HUNTER],

  MAGE: [Spec.ARCANE_MAGE, Spec.FIRE_MAGE, Spec.FROST_MAGE],

  PRIEST: [Spec.DISC_PRIEST, Spec.HOLY_PRIEST, Spec.SHADOW_PRIEST],

  DRUID: [Spec.FERAL_DRUID, Spec.BALANCE_DRUID, Spec.RESTO_DRUID, Spec.BEAR],

  SHAMAN: [Spec.ENHA_SHAMAN, Spec.ELE_SHAMAN, Spec.RESTO_SHAMAN],

  ROGUE: [Spec.ASSASSIN_ROGUE, Spec.COMBAT_ROGUE, Spec.SUB_ROGUE],

  WARLOCK: [Spec.AFFLI_WARLOCK, Spec.DEMO_WARLOCK, Spec.DESTRO_WARLOCK],
};
export const SPEC_CLASS = Object.entries(CLASS_SPECS).reduce(
  (acc, [className, specs]) => {
    for (const spec of specs) {
      acc[spec] = className;
    }
    return acc;
  },
  {} as Record<Spec, string>,
);