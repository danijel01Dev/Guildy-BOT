/*
  Warnings:

  - The values [BDK] on the enum `Spec` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Spec_new" AS ENUM ('PROT_PALADIN', 'PROT_WARRIOR', 'BEAR', 'HOLY_PALADIN', 'RETRI_PALADIN', 'HOLY_PRIEST', 'SHADOW_PRIEST', 'DISC_PRIEST', 'BLOOD_DK', 'FROST_DK', 'UNHOLY_DK', 'BM_HUNTER', 'MM_HUNTER', 'SURV_HUNTER', 'FROST_MAGE', 'FIRE_MAGE', 'ARCANE_MAGE', 'FERAL_DRUID', 'BALANCE_DRUID', 'RESTO_DRUID', 'RESTO_SHAMAN', 'ENHA_SHAMAN', 'ELE_SHAMAN', 'COMBAT_ROGUE', 'ASSASIN_ROGUE', 'SUB_ROGUE', 'FURY_WARRIOR', 'ARMS_WARRIOR', 'DEMO_WARLOCK', 'AFFLI_WARLOCK', 'DESTRO_WARLOCK');
ALTER TABLE "Character" ALTER COLUMN "spec" TYPE "Spec_new" USING ("spec"::text::"Spec_new");
ALTER TABLE "BisList" ALTER COLUMN "spec" TYPE "Spec_new" USING ("spec"::text::"Spec_new");
ALTER TYPE "Spec" RENAME TO "Spec_old";
ALTER TYPE "Spec_new" RENAME TO "Spec";
DROP TYPE "public"."Spec_old";
COMMIT;
