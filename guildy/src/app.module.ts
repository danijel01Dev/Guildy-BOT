import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { IntentsBitField } from 'discord.js';
import { NecordModule } from 'necord';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppUpdateService } from './app.update/app.update.service';
import { BislistModule } from './bislist/bislist.module';
import { CharactersModule } from './characters/characters.module';
import { DkpModule } from './dkp/dkp.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { SignupModule } from './signup/signup.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    NecordModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        token: config.get<string>('DISCORD_TOKEN')!,
        intents: [IntentsBitField.Flags.Guilds],
      }),
    }),

    PrismaModule,
    CharactersModule,
    DkpModule,
    BislistModule,
    SignupModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, AppUpdateService],
})
export class AppModule {}
