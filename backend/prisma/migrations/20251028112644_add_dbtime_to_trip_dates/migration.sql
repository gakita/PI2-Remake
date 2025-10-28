/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Trip" ALTER COLUMN "departureDate" SET DATA TYPE TIME,
ALTER COLUMN "returnDate" SET DATA TYPE TIME;

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
