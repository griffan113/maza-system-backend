/*
  Warnings:

  - You are about to drop the column `saw_code` on the `saw_orders` table. All the data in the column will be lost.
  - You are about to drop the column `teeth_number` on the `saw_orders` table. All the data in the column will be lost.
  - You are about to drop the column `teeth_value` on the `saw_orders` table. All the data in the column will be lost.
  - Added the required column `product_id` to the `saw_orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `service` to the `saw_orders` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SawOrderService" AS ENUM ('SHARPE', 'SELL');

-- AlterTable
ALTER TABLE "saw_orders" DROP COLUMN "saw_code",
DROP COLUMN "teeth_number",
DROP COLUMN "teeth_value",
ADD COLUMN     "product_id" TEXT NOT NULL,
ADD COLUMN     "service" "SawOrderService" NOT NULL;

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "teeth_number" INTEGER NOT NULL,
    "diameter" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "saw_orders" ADD CONSTRAINT "saw_orders_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
