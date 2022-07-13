/*
  Warnings:

  - You are about to drop the column `corporate_name` on the `clients` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `clients` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "client_contacts" ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "sector" DROP NOT NULL,
ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "phone" DROP NOT NULL;

-- AlterTable
ALTER TABLE "clients" DROP COLUMN "corporate_name",
DROP COLUMN "name",
ADD COLUMN     "company_name" TEXT;
