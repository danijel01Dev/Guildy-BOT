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
import { ScheduleModule } from '@nestjs/schedule';
import {CacheModule} from '@nestjs/cache-manager'
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ThrottlerModule } from '@nestjs/throttler';
import { createKeyv}  from '@keyv/redis'
@Module({
  imports: [ ConfigModule.forRoot({
      isGlobal: true,
    }),
    CacheModule.registerAsync({
  isGlobal: true,
  useFactory: async () => ({
    stores: [
      createKeyv(
        `redis://${process.env.REDIS_HOST || 'localhost'}:${process.env.REDIS_PORT || 6379}`,
      ),
    ],
    ttl: 60_000,
  }),
}),
   ThrottlerModule.forRoot({
    throttlers : [{
      ttl : 6000 ,
      limit : 10,
    }]
    
  })  ,
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot(),

    NecordModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        token: config.get<string>('DISCORD_TOKEN')!,
        intents: [IntentsBitField.Flags.Guilds, 
          IntentsBitField.Flags.GuildMembers
        ],
      }),
    }),

    PrismaModule,
    CharactersModule,
    DkpModule,
    BislistModule,
    SignupModule,
    AuthModule,
  ],
  controllers: [AppController ],
  providers: [AppService, PrismaService, AppUpdateService],
})
export class AppModule {}
