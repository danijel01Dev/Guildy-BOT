/*
  Warnings:

  - A unique constraint covering the columns `[guildId,userId]` on the table `GuildMember` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "GuildMember_guildId_userId_key" ON "GuildMember"("guildId", "userId");
