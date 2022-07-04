/*
  Warnings:

  - Added the required column `person_type` to the `clients` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PersonType" AS ENUM ('PHYSICAL', 'LEGAL');

-- AlterTable
ALTER TABLE "clients" ADD COLUMN     "person_type" "PersonType" NOT NULL;
