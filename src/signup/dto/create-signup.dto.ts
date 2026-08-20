export enum SignupStatus {
  ACTIVE = 'ACTIVE',
  BENCH = 'BENCH',
  TENTATIVE = 'TENTATIVE',
  ABSENCE = 'ABSENCE',
}

export class CreateSignupDto {
  
  discordGuildId: string;
  title: string;
  date: string;
  leader : string;
  discordChannelId : string ;
  note: string;
}

export class CreatePlayerSignupDto {
  discordId: string;
  discordGuildId: string;
  character: string;
}

export class UpdateSignupDto {
  discordId: string;
  discordGuildId: string;
  date?: string;
  title?: string;
  note?: string;
}

export class UpdatePlayerSignupStatusDto {
  discordId: string;
  discordGuildId: string;
  character: string;
  status: SignupStatus;
}
