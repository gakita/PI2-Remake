/*
  Warnings:

  - The primary key for the `Ticket` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `cityId` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `tiketCode` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the `Cities` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `seatCount` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPrice` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tripId` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Ticket" DROP CONSTRAINT "Ticket_cityId_fkey";

-- AlterTable
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_pkey",
DROP COLUMN "cityId",
DROP COLUMN "date",
DROP COLUMN "tiketCode",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "seatCount" INTEGER NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "totalPrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "tripId" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avatarPath" TEXT DEFAULT 'default-avatar.png';

-- DropTable
DROP TABLE "public"."Cities";

-- CreateTable
CREATE TABLE "City" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "imagePath" TEXT DEFAULT 'https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trip" (
    "id" SERIAL NOT NULL,
    "fromCityId" INTEGER NOT NULL,
    "toCityId" INTEGER NOT NULL,
    "departureDate" TIMESTAMP(3) NOT NULL,
    "returnDate" TIMESTAMP(3),
    "basePrice" DOUBLE PRECISION NOT NULL,
    "availableSeats" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Trip_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "City_name_key" ON "City"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Trip_fromCityId_toCityId_departureDate_key" ON "Trip"("fromCityId", "toCityId", "departureDate");

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_fromCityId_fkey" FOREIGN KEY ("fromCityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_toCityId_fkey" FOREIGN KEY ("toCityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
