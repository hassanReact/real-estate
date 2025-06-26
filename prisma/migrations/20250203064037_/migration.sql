/*
  Warnings:

  - You are about to drop the column `PhoneNumber` on the `User` table. All the data in the column will be lost.
  - Added the required column `areaType` to the `PropertyFeature` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AreaType" AS ENUM ('SQUARE_METER', 'SQUARE_FEET', 'SQUARE_YARD', 'MARLA', 'KANAL');

-- AlterTable
ALTER TABLE "PropertyFeature" ADD COLUMN     "areaType" "AreaType" NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "PhoneNumber",
ADD COLUMN     "phoneNumber" TEXT;
