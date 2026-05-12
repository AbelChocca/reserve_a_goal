/*
  Warnings:

  - You are about to drop the column `localId` on the `space` table. All the data in the column will be lost.
  - Added the required column `locationId` to the `space` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "space" DROP CONSTRAINT "space_localId_fkey";

-- AlterTable
ALTER TABLE "space" DROP COLUMN "localId",
ADD COLUMN     "locationId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "image" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_image" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "imageId" TEXT NOT NULL,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "location_image" (
    "id" TEXT NOT NULL,
    "locationId" TEXT NOT NULL,
    "imageId" TEXT NOT NULL,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "location_image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "space_image" (
    "id" TEXT NOT NULL,
    "spaceId" TEXT NOT NULL,
    "imageId" TEXT NOT NULL,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "space_image_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_image_userId_key" ON "user_image"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "user_image_imageId_key" ON "user_image"("imageId");

-- CreateIndex
CREATE UNIQUE INDEX "user_image_userId_imageId_key" ON "user_image"("userId", "imageId");

-- CreateIndex
CREATE UNIQUE INDEX "location_image_locationId_imageId_key" ON "location_image"("locationId", "imageId");

-- CreateIndex
CREATE UNIQUE INDEX "space_image_spaceId_imageId_key" ON "space_image"("spaceId", "imageId");

-- AddForeignKey
ALTER TABLE "user_image" ADD CONSTRAINT "user_image_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_image" ADD CONSTRAINT "user_image_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "image"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "location_image" ADD CONSTRAINT "location_image_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "location_image" ADD CONSTRAINT "location_image_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "image"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "space" ADD CONSTRAINT "space_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "space_image" ADD CONSTRAINT "space_image_spaceId_fkey" FOREIGN KEY ("spaceId") REFERENCES "space"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "space_image" ADD CONSTRAINT "space_image_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "image"("id") ON DELETE CASCADE ON UPDATE CASCADE;
