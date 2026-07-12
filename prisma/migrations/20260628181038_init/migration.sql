/*
  Warnings:

  - You are about to drop the column `template` on the `Signup` table. All the data in the column will be lost.
  - Added the required column `leader` to the `Signup` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Signup" DROP COLUMN "template",
ADD COLUMN     "leader" TEXT NOT NULL;
