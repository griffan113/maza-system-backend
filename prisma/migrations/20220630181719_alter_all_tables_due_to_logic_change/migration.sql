/*
  Warnings:

  - You are about to drop the column `company_name` on the `clients` table. All the data in the column will be lost.
  - You are about to drop the column `cpf` on the `clients` table. All the data in the column will be lost.
  - You are about to drop the column `financial_contact_email` on the `clients` table. All the data in the column will be lost.
  - You are about to drop the column `financial_contact_name` on the `clients` table. All the data in the column will be lost.
  - You are about to drop the column `invoice_email` on the `clients` table. All the data in the column will be lost.
  - You are about to drop the column `person_type` on the `clients` table. All the data in the column will be lost.
  - You are about to drop the column `technician_contact_email` on the `clients` table. All the data in the column will be lost.
  - You are about to drop the column `technician_contact_name` on the `clients` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `orders` table. All the data in the column will be lost.
  - You are about to alter the column `order_number` on the `orders` table. The data in that column could be lost. The data in that column will be cast from `Int8` to `Int4`.
  - You are about to alter the column `total_quantity` on the `orders` table. The data in that column could be lost. The data in that column will be cast from `Int8` to `Int4`.
  - You are about to alter the column `teeth_number` on the `products` table. The data in that column could be lost. The data in that column will be cast from `Int8` to `Int4`.
  - You are about to alter the column `diameter` on the `products` table. The data in that column could be lost. The data in that column will be cast from `Int8` to `Int4`.
  - You are about to drop the column `is_admin` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `saw_orders` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `cep` to the `clients` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `total_price` on the `orders` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'PRODUCTION', 'EDITOR');

-- CreateEnum
CREATE TYPE "OrderPaymentMethod" AS ENUM ('CARD', 'CASH', 'PIX', 'BANK_BILL');

-- CreateEnum
CREATE TYPE "OrderStatusEnum" AS ENUM ('RECEPT', 'IN_PROGRESS', 'WAITING_WITHDRAW', 'WAITING_PAYMENT', 'DONE', 'CANCELED');

-- CreateEnum
CREATE TYPE "OrderItemType" AS ENUM ('SHARPE', 'SELL', 'ESTIMATE');

-- CreateEnum
CREATE TYPE "SharpeType" AS ENUM ('COMPLETE', 'PARTIAL', 'WITH_REPAIR');

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_client_id_fkey";

-- DropForeignKey
ALTER TABLE "saw_orders" DROP CONSTRAINT "saw_orders_order_id_fkey";

-- DropForeignKey
ALTER TABLE "saw_orders" DROP CONSTRAINT "saw_orders_product_id_fkey";

-- DropIndex
DROP INDEX "clients_cpf_key";

-- AlterTable
ALTER TABLE "clients" DROP COLUMN "company_name";
ALTER TABLE "clients" DROP COLUMN "cpf";
ALTER TABLE "clients" DROP COLUMN "financial_contact_email";
ALTER TABLE "clients" DROP COLUMN "financial_contact_name";
ALTER TABLE "clients" DROP COLUMN "invoice_email";
ALTER TABLE "clients" DROP COLUMN "person_type";
ALTER TABLE "clients" DROP COLUMN "technician_contact_email";
ALTER TABLE "clients" DROP COLUMN "technician_contact_name";
ALTER TABLE "clients" ADD COLUMN     "address" STRING;
ALTER TABLE "clients" ADD COLUMN     "address_number" STRING;
ALTER TABLE "clients" ADD COLUMN     "cep" INT4 NOT NULL;
ALTER TABLE "clients" ADD COLUMN     "corporate_name" STRING;
ALTER TABLE "clients" ADD COLUMN     "fantasy_name" STRING;
ALTER TABLE "clients" ADD COLUMN     "name" STRING;
ALTER TABLE "clients" ADD COLUMN     "nfe_email" STRING;
ALTER TABLE "clients" ADD COLUMN     "phone" STRING;
ALTER TABLE "clients" ADD COLUMN     "state_registration" STRING;

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "date";
ALTER TABLE "orders" DROP COLUMN "status";
ALTER TABLE "orders" ADD COLUMN     "delivery_fee" DOUBLE PRECISION;
ALTER TABLE "orders" ADD COLUMN     "observations" STRING;
ALTER TABLE "orders" ADD COLUMN     "payment_date" TIMESTAMP(3);
ALTER TABLE "orders" ADD COLUMN     "payment_method" "OrderPaymentMethod";
ALTER TABLE "orders" ALTER COLUMN "order_number" SET DATA TYPE INT4;
ALTER TABLE "orders" DROP COLUMN "total_price";
ALTER TABLE "orders" ADD COLUMN     "total_price" DOUBLE PRECISION NOT NULL;
ALTER TABLE "orders" ALTER COLUMN "total_quantity" SET DATA TYPE INT4;

-- AlterTable
ALTER TABLE "products" ALTER COLUMN "teeth_number" SET DATA TYPE INT4;
ALTER TABLE "products" ALTER COLUMN "diameter" SET DATA TYPE INT4;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "is_admin";
ALTER TABLE "users" ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT E'EDITOR';

-- DropTable
DROP TABLE "saw_orders";

-- DropEnum
DROP TYPE "OrderStatus";

-- DropEnum
DROP TYPE "PersonType";

-- DropEnum
DROP TYPE "SawOrderService";

-- CreateTable
CREATE TABLE "client_contacts" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,
    "sector" STRING NOT NULL,
    "email" STRING NOT NULL,
    "phone" STRING NOT NULL,
    "client_id" STRING NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "client_contacts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_statuses" (
    "id" STRING NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "status" "OrderStatusEnum" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "order_statuses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_entries" (
    "id" STRING NOT NULL,
    "order_id" STRING NOT NULL,
    "description" STRING NOT NULL,
    "diameter" INT4,
    "quantity" INT4 NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "order_entries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_item" (
    "id" STRING NOT NULL,
    "total_price" DOUBLE PRECISION NOT NULL,
    "type" "OrderItemType" NOT NULL,
    "sharpe_type" "SharpeType",
    "description" STRING NOT NULL,
    "quantity" INT4 NOT NULL,
    "product_unity_price" DOUBLE PRECISION,
    "code" STRING NOT NULL,
    "pallet_quantity" INT4,
    "pallet_price" DOUBLE PRECISION,
    "insertion_quantity" INT4,
    "insertion_price" DOUBLE PRECISION,
    "order_id" STRING NOT NULL,
    "product_id" STRING NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "order_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_OrderToOrderStatus" (
    "A" STRING NOT NULL,
    "B" STRING NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_OrderToOrderStatus_AB_unique" ON "_OrderToOrderStatus"("A", "B");

-- CreateIndex
CREATE INDEX "_OrderToOrderStatus_B_index" ON "_OrderToOrderStatus"("B");

-- AddForeignKey
ALTER TABLE "client_contacts" ADD CONSTRAINT "client_contacts_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_entries" ADD CONSTRAINT "order_entries_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_item" ADD CONSTRAINT "order_item_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_item" ADD CONSTRAINT "order_item_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrderToOrderStatus" ADD CONSTRAINT "_OrderToOrderStatus_A_fkey" FOREIGN KEY ("A") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrderToOrderStatus" ADD CONSTRAINT "_OrderToOrderStatus_B_fkey" FOREIGN KEY ("B") REFERENCES "order_statuses"("id") ON DELETE CASCADE ON UPDATE CASCADE;
