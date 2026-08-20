-- CreateEnum
CREATE TYPE "Rank" AS ENUM ('OWNER', 'GM', 'OFFICER', 'MEMBER');

-- CreateEnum
CREATE TYPE "Spec" AS ENUM ('PROT_PALADIN', 'PROT_WARRIOR', 'BDK', 'BEAR', 'HOLY_PALADIN', 'RETRI_PALADIN', 'HOLY_PRIEST', 'SHADOW_PRIEST', 'DISC_PRIEST', 'BLOOD_DK', 'FROST_DK', 'UNHOLY_DK', 'BM_HUNTER', 'MM_HUNTER', 'SURV_HUNTER', 'FROST_MAGE', 'FIRE_MAGE', 'ARCANE_MAGE', 'FERAL_DRUID', 'BALANCE_DRUID', 'RESTO_DRUID', 'RESTO_SHAMAN', 'ENHA_SHAMAN', 'ELE_SHAMAN', 'COMBAT_ROGUE', 'ASSASIN_ROGUE', 'SUB_ROGUE', 'FURY_WARRIOR', 'ARMS_WARRIOR', 'DEMO_WARLOCK', 'AFFLI_WARLOCK', 'DESTRO_WARLOCK');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ACTIVE', 'TENTATIVE', 'ABSENCE', 'BENCH', 'LATE');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "discordId" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Guild" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "discordGuildId" TEXT NOT NULL,

    CONSTRAINT "Guild_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GuildMember" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "rank" "Rank" NOT NULL,
    "userId" INTEGER NOT NULL,
    "guildId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "slug" TEXT NOT NULL,
    "dkp" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "GuildMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Character" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "spec" "Spec" NOT NULL,
    "isMain" BOOLEAN NOT NULL DEFAULT false,
    "guildMemberId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DkpImport" (
    "id" SERIAL NOT NULL,
    "dkpImport" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "guildId" INTEGER NOT NULL,

    CONSTRAINT "DkpImport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Signup" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "note" TEXT NOT NULL,
    "template" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "guildId" INTEGER NOT NULL,
    "discordMessageId" TEXT NOT NULL,
    "discordChannelId" TEXT NOT NULL,

    CONSTRAINT "Signup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BisList" (
    "id" SERIAL NOT NULL,
    "guildId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "spec" "Spec" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "imgUrl" TEXT NOT NULL,

    CONSTRAINT "BisList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayerSignup" (
    "id" SERIAL NOT NULL,
    "characterId" INTEGER NOT NULL,
    "signupId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "Status" NOT NULL,

    CONSTRAINT "PlayerSignup_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_discordId_key" ON "User"("discordId");

-- CreateIndex
CREATE UNIQUE INDEX "Guild_discordGuildId_key" ON "Guild"("discordGuildId");

-- CreateIndex
CREATE UNIQUE INDEX "GuildMember_slug_key" ON "GuildMember"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Character_guildMemberId_name_key" ON "Character"("guildMemberId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "PlayerSignup_signupId_characterId_key" ON "PlayerSignup"("signupId", "characterId");

-- AddForeignKey
ALTER TABLE "GuildMember" ADD CONSTRAINT "GuildMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuildMember" ADD CONSTRAINT "GuildMember_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "Guild"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_guildMemberId_fkey" FOREIGN KEY ("guildMemberId") REFERENCES "GuildMember"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DkpImport" ADD CONSTRAINT "DkpImport_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "Guild"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Signup" ADD CONSTRAINT "Signup_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "Guild"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BisList" ADD CONSTRAINT "BisList_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "Guild"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerSignup" ADD CONSTRAINT "PlayerSignup_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerSignup" ADD CONSTRAINT "PlayerSignup_signupId_fkey" FOREIGN KEY ("signupId") REFERENCES "Signup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
