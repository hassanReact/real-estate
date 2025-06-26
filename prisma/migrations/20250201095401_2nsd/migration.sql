-- AlterTable
ALTER TABLE "User" ADD COLUMN     "PhoneNumber" TEXT,
ADD COLUMN     "ProfileComplete" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "latitude" TEXT,
ADD COLUMN     "longitude" TEXT,
ADD COLUMN     "province" TEXT,
ADD COLUMN     "streetAddress" TEXT,
ALTER COLUMN "isAdmin" SET DEFAULT false;
