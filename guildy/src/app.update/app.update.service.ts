import { BadRequestException, ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import {
  ActionRowBuilder,
  AttachmentBuilder,
  ButtonBuilder,
  ButtonStyle,
  Client,
  EmbedBuilder,
  ModalBuilder,
  PermissionsBitField,
  StringSelectMenuBuilder,
  TextChannel,
  TextInputBuilder,
  TextInputStyle,
} from 'discord.js';
import * as necord from 'necord';
import { Rank, Spec, Status } from 'generated/prisma/enums';
import { CharactersService } from 'src/characters/characters.service';
import { deleteChar, findCharName, registerChars } from './register.Char.Dto';
import { CreateSignupDto } from './createSignup.dto';
import { SignupService } from 'src/signup/signup.service';
import { OnEvent, EventEmitter2 } from '@nestjs/event-emitter';
import { group } from 'console';
import { parseCharacters } from './wow-char-parser';
import path from 'path';

type CharacterRegistrationResult = {
  name: string;
  spec: string;
  status:
    | 'created'
    | 'already_exists'
    | 'invalid_name'
    | 'invalid_spec'
    | 'error';
};
type SignupAnnouncement = {
  title: string;
  date: string;
  leader: string;
  channelId: string;
  roster: [string, string][];
};
@Injectable()
export class AppUpdateService {
  private readonly logger = new Logger(AppUpdateService.name);
  public constructor(
    private readonly client: Client,
    private char: CharactersService,
    private signup : SignupService,
private readonly eventEmitter: EventEmitter2
    
  ) {console.log(" discord service constructor")}
   onModuleInit() {
    console.log(
      'signup.created listeners:',
      this.eventEmitter.listenerCount('signup.created'),
    );
  }
  onApplicationBootstrap() {
    console.log(
      'Listeners after bootstrap:',
      this.eventEmitter.listenerCount('signup.created'),
    );
  }
  ;
  @OnEvent('signup.created')
 async handleRosterAnnounce( data : any){
 const rosterLines = data.roster.length
  ? data.roster.map(([name, spec]) => {
      const icon = SPEC_EMOJIS[spec as Spec] ?? '❔';
      return `${icon} **${name}**`;
    })
  : ['*No players signed up yet.*'];

const embed = new EmbedBuilder()
  .setColor(0x5865f2)
  .setTitle(`❄️ ${data.title}`)
  .addFields(
    {
      name: '📆 Date',
      value: String(data.date || 'Not specified'),
      inline: true,
    },
    {
      name: '👑 Raid Leader',
      value: String(data.leader || 'Not specified'),
      inline: true,
    },
   
  );

const chunkSize = 5;

for (let i = 0; i < rosterLines.length; i += chunkSize) {
  const chunk = rosterLines.slice(i, i + chunkSize);
const groupNumber = Math.floor(i / chunkSize) + 1;
  embed.addFields({
    name: `Group ${groupNumber}`,
    value: chunk.join('\n'),
    inline: false,
  });
}

embed.setTimestamp();

  const channel = await this.client.channels.fetch(data.channelId);

  if (!(channel instanceof TextChannel)) {
    this.logger.warn(`Channel ${data.channelId} is not a text channel.`);
    return;
  }
await channel.send({
  content: '@everyone',
  embeds: [embed],
  allowedMentions: {
    parse: ['everyone'],
  },
});
  
}
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
     const rank = interaction.memberPermissions?.has(
  PermissionsBitField.Flags.Administrator,
)
  ? 'OFFICER'
  : 'MEMBER';
      await this.char.create(
        interaction.user.username,
      interaction.user.avatar,
      interaction.user.id,
      interaction.guildId,
      {
        slug: characterName,
        isMain: false,
        spec,
        rank: rank ,
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



@necord.SlashCommand({
  name: 'register-chars',
  description: 'register characters',
})
async registerChars(
  @necord.Context() [interaction]: necord.SlashCommandContext,
  @necord.Options() options: registerChars,
) {
  const rawText = options.list;
  const result = parseCharacters(rawText);

  if (!interaction.guildId) {
    await interaction.reply({
      content: 'Character registration must be done in a server.',
      ephemeral: true,
    });
    return;
  }

  const registrationResults: CharacterRegistrationResult[] = [];

  const SPEC_KEYS: Record<string, Spec> = Object.fromEntries(
    Object.entries(SPEC_LABELS).map(([key, label]) => [
      label,
      key as Spec,
    ]),
  );

  const rank = interaction.memberPermissions?.has(
    PermissionsBitField.Flags.Administrator,
  )
    ? 'OFFICER'
    : 'MEMBER';

  for (const char of result.characters) {
    try {
      const spec = SPEC_KEYS[char.spec];

      if (!spec) {
        registrationResults.push({
          name: char.name,
          spec: char.spec,
          status: 'invalid_spec',
        });
        continue;
      }

  
      await this.char.create(
        interaction.user.username,
        interaction.user.avatar,
        interaction.user.id,
        interaction.guildId,
        {
          slug: char.name,
          isMain: false,
          spec,
          rank,
          guildName: interaction.guild?.name ?? 'Unknown Guild',
        },
      );

      registrationResults.push({
        name: char.name,
        spec: char.spec,
        status: 'created',
      });
    } catch (err) {
      if (err instanceof ConflictException) {
        registrationResults.push({
          name: char.name,
          spec: char.spec,
          status: 'already_exists',
        });
      } else if (err instanceof BadRequestException) {
        registrationResults.push({
          name: char.name,
          spec: char.spec,
          status: 'invalid_name',
        });
      } else {
        registrationResults.push({
          name: char.name,
          spec: char.spec,
          status: 'error',
        });
      }
    }
  }

  const statusMap: Record<
    CharacterRegistrationResult['status'],
    string
  > = {
    created: '✅ Created',
    already_exists: '⚠️ Already exists',
    invalid_name: '❌ Invalid character name',
    invalid_spec: '❌ Invalid specialization',
    error: '❌ Unknown error',
  };

  const created = registrationResults.filter(
    (char) => char.status === 'created',
  ).length;

  const failed = registrationResults.length - created;

  const response = [
    '**Character registration completed!**',
    '',
    `✅ Created: ${created}`,
    `❌ Failed: ${failed}`,
    '',
    ...registrationResults.map(
      (char) =>
        `**${char.name}** (${char.spec}) — ${statusMap[char.status]}`,
    ),
  ].join('\n');

  await interaction.reply({
    content: response,
    ephemeral: true,
  });
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
 
}
}

@necord.StringSelect('pick-spec')
public async pickSpec(
  @necord.Context() [interaction]: necord.StringSelectContext,
) {
  try{const [name, spec] = interaction.values[0].split(':');

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
  });}
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
  
    }}}



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
  

const isAdmin = interaction.memberPermissions?.has(
  PermissionsBitField.Flags.Administrator,
);

if (!isAdmin) {
  await interaction.reply({
    content: 'Only Discord administrators can create signups.',
    ephemeral: true,
  });
  return;
}
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


private signupSelections = new Map<
  string,
  {
    selectedIds: number[];
    page: number;
  }
>();

private getSignupSelectionKey(
  guildId: string,
  userId: string,
  signupId: number,
): string {
  return `${guildId}:${userId}:${signupId}`;
}

// ==========================================
// BUILD CHARACTER SELECT MENU
// ==========================================

private buildCharacterSelection(
  signupId: number,
  chars: any[],
  state: { selectedIds: number[]; page: number },
) {
  const PAGE_SIZE = 25;
  const totalPages = Math.ceil(chars.length / PAGE_SIZE);

  const pageChars = chars.slice(
    state.page * PAGE_SIZE,
    (state.page + 1) * PAGE_SIZE,
  );

  const selected = new Set(state.selectedIds);

  const select = new StringSelectMenuBuilder()
    .setCustomId(`signup-character/${signupId}/${state.page}`)
    .setPlaceholder('Choose your characters')
    .setMinValues(0)
    .setMaxValues(pageChars.length)
    .addOptions(
      pageChars.map((char) => ({
        label: char.name,
        description: SPEC_LABELS[char.spec],
        value: String(char.id),
        default: selected.has(char.id),
      })),
    );

  const selectRow =
    new ActionRowBuilder<StringSelectMenuBuilder>()
      .addComponents(select);

  const buttons = new ActionRowBuilder<ButtonBuilder>()
    .addComponents(
      new ButtonBuilder()
        .setCustomId(`signup-page/${signupId}/${state.page - 1}`)
        .setLabel('Previous')
        .setStyle(ButtonStyle.Secondary)
        .setDisabled(state.page === 0),

      new ButtonBuilder()
        .setCustomId(`signup-page/${signupId}/${state.page + 1}`)
        .setLabel('Next')
        .setStyle(ButtonStyle.Secondary)
        .setDisabled(state.page >= totalPages - 1),

      new ButtonBuilder()
        .setCustomId(`signup-submit/${signupId}`)
        .setLabel(`Submit (${state.selectedIds.length})`)
        .setStyle(ButtonStyle.Success)
        .setDisabled(state.selectedIds.length === 0),

      new ButtonBuilder()
        .setCustomId(`signup-cancel/${signupId}`)
        .setLabel('Cancel')
        .setStyle(ButtonStyle.Danger),
    );

  return {
    content:
      `Select your characters (Page ${state.page + 1}/${totalPages})\n` +
      `Selected: **${state.selectedIds.length}**`,
    components: [selectRow, buttons],
  };
}

// ==========================================
// INITIAL SIGNUP BUTTON
// ==========================================

@necord.Button('signup-join/:signupId')
public async signupJoin(
  @necord.Context() [interaction]: necord.ButtonContext,
) {
  try {
    const signupId = Number(interaction.customId.split('/')[1]);

    if (!Number.isInteger(signupId) || signupId <= 0) {
      throw new BadRequestException('Invalid signup.');
    }

    const chars = await this.char.findUserCharacters(
      interaction.user.id,
      interaction.guildId!,
    );

    if (!chars || chars.length === 0) {
      throw new NotFoundException(
        'You do not have registered characters.',
      );
    }

    const key = this.getSignupSelectionKey(
      interaction.guildId!,
      interaction.user.id,
      signupId,
    );

    const state = {
      selectedIds: [],
      page: 0,
    };

    this.signupSelections.set(key, state);

    const menu = this.buildCharacterSelection(
      signupId,
      chars,
      state,
    );

    await interaction.reply({
      ...menu,
      ephemeral: true,
    });
  } catch (err) {
    console.error('Signup join error:', err);

    if (!interaction.replied && !interaction.deferred) {
      await interaction.reply({
        content:
          err instanceof NotFoundException
            ? 'You do not have registered characters in this guild.'
            : 'Something went wrong. Please try again.',
        ephemeral: true,
      });
    }
  }
}

// ==========================================
// CHARACTER MULTI SELECT
// ==========================================

@necord.StringSelect('signup-character/:signupId/:page')
public async signupCharacter(
  @necord.Context() [interaction]: necord.StringSelectContext,
) {
  try {
    const [, signupIdString, pageString] =
      interaction.customId.split('/');

    const signupId = Number(signupIdString);
    const page = Number(pageString);

    if (
      !Number.isInteger(signupId) ||
      !Number.isInteger(page) ||
      page < 0
    ) {
      throw new BadRequestException('Invalid selection.');
    }

    const key = this.getSignupSelectionKey(
      interaction.guildId!,
      interaction.user.id,
      signupId,
    );

    const state = this.signupSelections.get(key);

    if (!state) {
      await interaction.update({
        content: 'Your selection expired. Please start again.',
        components: [],
      });
      return;
    }

    const chars = await this.char.findUserCharacters(
      interaction.user.id,
      interaction.guildId!,
    );

    const pageChars = chars.slice(page * 25, (page + 1) * 25);

    if (pageChars.length === 0) {
      throw new BadRequestException('Invalid page.');
    }

    const pageIds = new Set(
      pageChars.map((char) => char.id),
    );

    const selectedOnPage = interaction.values.map(Number);

    if (
      selectedOnPage.some(
        (id) => !Number.isSafeInteger(id) || !pageIds.has(id),
      )
    ) {
      throw new BadRequestException('Invalid character selection.');
    }

    // Keep selections from other pages.
    const selectedFromOtherPages = state.selectedIds.filter(
      (id) => !pageIds.has(id),
    );

    // Replace only current page selections.
    state.selectedIds = [
      ...new Set([
        ...selectedFromOtherPages,
        ...selectedOnPage,
      ]),
    ];

    state.page = page;

    this.signupSelections.set(key, state);

    const menu = this.buildCharacterSelection(
      signupId,
      chars,
      state,
    );

    await interaction.update(menu);
  } catch (err) {
    console.error('Character selection error:', err);

    await interaction.update({
      content: 'Unable to process your character selection.',
      components: [],
    });
  }
}

// ==========================================
// PAGINATION
// ==========================================

@necord.Button('signup-page/:signupId/:page')
public async signupPage(
  @necord.Context() [interaction]: necord.ButtonContext,
) {
  try {
    const [, signupIdString, pageString] =
      interaction.customId.split('/');

    const signupId = Number(signupIdString);
    const requestedPage = Number(pageString);

    const key = this.getSignupSelectionKey(
      interaction.guildId!,
      interaction.user.id,
      signupId,
    );

    const state = this.signupSelections.get(key);

    if (!state) {
      await interaction.update({
        content: 'Your selection expired. Please start again.',
        components: [],
      });
      return;
    }

    const chars = await this.char.findUserCharacters(
      interaction.user.id,
      interaction.guildId!,
    );

    const totalPages = Math.ceil(chars.length / 25);

    if (totalPages === 0) {
      throw new NotFoundException('No registered characters.');
    }

    state.page = Math.max(
      0,
      Math.min(requestedPage, totalPages - 1),
    );

    this.signupSelections.set(key, state);

    const menu = this.buildCharacterSelection(
      signupId,
      chars,
      state,
    );

    await interaction.update(menu);
  } catch (err) {
    console.error('Pagination error:', err);

    await interaction.update({
      content: 'Unable to change page.',
      components: [],
    });
  }
}

// ==========================================
// SUBMIT SIGNUP
// ==========================================

@necord.Button('signup-submit/:signupId')
public async signupSubmit(
  @necord.Context() [interaction]: necord.ButtonContext,
) {
  const signupId = Number(interaction.customId.split('/')[1]);

  const key = this.getSignupSelectionKey(
    interaction.guildId!,
    interaction.user.id,
    signupId,
  );

  try {
    const selection = this.signupSelections.get(key);

    if (!selection || selection.selectedIds.length === 0) {
      await interaction.update({
        content: 'Your selection expired or is empty. Please start again.',
        components: [],
      });
      return;
    }

    const characterIds = [...selection.selectedIds];

    // Remove selection to prevent duplicate submission.
    this.signupSelections.delete(key);

    const chars = await this.char.findUserCharacters(
      interaction.user.id,
      interaction.guildId!,
    );

    const allowedIds = new Set(
      chars.map((char) => char.id),
    );

    if (characterIds.some((id) => !allowedIds.has(id))) {
      await interaction.update({
        content: 'Invalid character selection.',
        components: [],
      });
      return;
    }

    // Acknowledge Discord interaction before processing.
    await interaction.deferUpdate();

    const results: {
      characterId: number;
      status: 'created' | 'already_exists' | 'error';
    }[] = [];

    let updatedSignup: any = null;

    // Process characters one by one using existing service.
    for (const characterId of characterIds) {
      try {
        const signup = await this.signup.createPlayerSignup(
          signupId,
          characterId,
          chars.map((char) => char.id),
        );

        if (!signup) {
          results.push({
            characterId,
            status: 'error',
          });
          continue;
        }

        updatedSignup = signup;

        results.push({
          characterId,
          status: 'created',
        });
      } catch (err) {
        if (err instanceof ConflictException) {
          results.push({
            characterId,
            status: 'already_exists',
          });
        } else {
          console.error(
            `Signup failed for character ${characterId}:`,
            err,
          );

          results.push({
            characterId,
            status: 'error',
          });
        }
      }
    }

    // Update Discord signup embed only once.
    let embedUpdated = true;

    if (updatedSignup) {
      try {
        const channel = await this.client.channels.fetch(
          updatedSignup.discordChannelId,
        );

        if (!channel || !channel.isTextBased()) {
          throw new NotFoundException('Discord channel not found.');
        }

        const message = await (channel as TextChannel).messages.fetch(
          updatedSignup.discordMessageId,
        );

        await message.edit({
          embeds: [this.buildSignupEmbed(updatedSignup)],
        });
      } catch (err) {
        embedUpdated = false;
        console.error('Signup embed update error:', err);
      }
    }

    const created = results.filter(
      (result) => result.status === 'created',
    ).length;

    const alreadyExists = results.filter(
      (result) => result.status === 'already_exists',
    ).length;

    const failed = results.filter(
      (result) => result.status === 'error',
    ).length;

    const summary = [
      '**Character signup completed!**',
      '',
      `✅ Created: ${created}`,
      `⚠️ Already signed up: ${alreadyExists}`,
      `❌ Failed: ${failed}`,
      '',
      ...results.map((result) => {
        const char = chars.find(
          (item) => item.id === result.characterId,
        );

        const status = {
          created: '✅ Created',
          already_exists: '⚠️ Already signed up',
          error: '❌ Failed',
        }[result.status];

        return `**${char?.name ?? result.characterId}** — ${status}`;
      }),
      ...(!embedUpdated
        ? ['', '⚠️ Signup was processed, but the Discord event message could not be updated.']
        : []),
    ].join('\n');

    await interaction.editReply({
      content: summary,
      components: [],
    });
  } catch (err) {
    console.error('Signup submit error:', err);

    if (interaction.deferred) {
      await interaction.editReply({
        content: 'Something went wrong while processing your signup.',
        components: [],
      });
    } else if (!interaction.replied) {
      await interaction.reply({
        content: 'Something went wrong. Please try again.',
        ephemeral: true,
      });
    }
  }
}

// ==========================================
// CANCEL SIGNUP
// ==========================================

@necord.Button('signup-cancel/:signupId')
public async signupCancel(
  @necord.Context() [interaction]: necord.ButtonContext,
) {
  const signupId = Number(interaction.customId.split('/')[1]);

  const key = this.getSignupSelectionKey(
    interaction.guildId!,
    interaction.user.id,
    signupId,
  );

  this.signupSelections.delete(key);

  await interaction.update({
    content: 'Signup cancelled.',
    components: [],
  });
}



 
private buildSignupEmbed(signup: any) {
  const players = signup.playerSignups.filter(
    (p: any) => p.character,
  );

  const uniqueMembers = new Set(
    players.map((p: any) => p.character.guildMemberId),
  );

  const grouped = new Map<Spec, string[]>();

  const bench: string[] = [];
  const tentative: string[] = [];
  const absence: string[] = [];

  for (const player of players) {
    const name = player.character.name;

    switch (player.status) {
      case Status.ABSENCE:
        absence.push(name);
        continue;

      case Status.BENCH:
        bench.push(name);
        continue;

      case Status.TENTATIVE:
        tentative.push(name);
        continue;

      case Status.ACTIVE:
        break;

      default:
        continue;
    }

    const spec = player.character.spec;

    if (!grouped.has(spec)) {
      grouped.set(spec, []);
    }

    grouped.get(spec)!.push(name);
  }

  // Keep Discord field values below 1024 characters.
  const formatList = (names: string[]) => {
    if (!names.length) return '—';

    const result = names.join('\n');

    if (result.length <= 1000) return result;

    let output = '';

    for (const name of names) {
      if ((output + '\n' + name).length > 970) {
        break;
      }

      output += (output ? '\n' : '') + name;
    }

    const remaining = names.length - output.split('\n').length;

    return `${output}\n...and ${remaining} more`;
  };
   const logo = new AttachmentBuilder(
  path.join(process.cwd(), 'logo', 'guildy.png'),
  { name: 'guildy.png' },
);
  const embed = new EmbedBuilder()
    .setThumbnail('attachment://guildy.png')
    .setColor(0x4f8ef7)
    .setTitle(`❄️ ${signup.title}`)
    .setDescription(
      [
        signup.note ? `📝 ${signup.note}` : '',
        '',
        '[🌐 Open Guildy Signup](https://guildy.uk/)',
      ]
        .filter(Boolean)
        .join('\n'),
    )
    .addFields(
      {
        name: '📅 Raid Date',
        value: signup.date || 'TBA',
        inline: true,
      },
      {
        name: '👑 Raid Leader',
        value: signup.leader || 'Unknown',
        inline: true,
      },
      {
        name: '👥 Signed',
        value: `**${uniqueMembers.size}/40**`,
        inline: true,
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
  ] as const;

  // Active raid roster
  for (const cls of classOrder) {
    const specs = CLASS_SPECS[cls];
    const names: string[] = [];

    for (const spec of specs) {
      const players = grouped.get(spec);

      if (!players?.length) continue;

      for (const player of players) {
        names.push(`${SPEC_EMOJIS[spec]} ${player}`);
      }
    }

    if (!names.length) continue;

    embed.addFields({
      name: `${CLASS_EMOJIS[cls]} ${CLASS_LABELS[cls]}`,
      value: formatList(names),
      inline: true,
    });
  }

  // Additional signup statuses
  embed.addFields(
    {
      name: '🪑 Bench',
      value: formatList(bench),
      inline: true,
    },
    {
      name: '❔ Tentative',
      value: formatList(tentative),
      inline: true,
    },
    {
      name: '❌ Absence',
      value: formatList(absence),
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


@necord.On('guildMemberUpdate')
async onGuildMemberUpdate(
  @necord.Context() [oldMember , newMember] : necord.ContextOf<'guildMemberUpdate'>,){
  try{
    
    if(oldMember.roles.cache.equals(newMember.roles.cache)){
      return
    }
const rank = newMember.permissions.has('Administrator')
    ? 'OFFICER'
    : 'MEMBER';

    
    await this.char.updateRole(newMember.user.id, rank, newMember.guild.id)}
    catch(err){
      
      return "Something went wrong"

    }
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