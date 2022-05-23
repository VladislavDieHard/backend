/*
  Warnings:

  - You are about to drop the column `preview` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `preview` on the `Entry` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `MainSlider` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Document` DROP COLUMN `preview`,
    ADD COLUMN `fileId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Entry` DROP COLUMN `preview`,
    ADD COLUMN `fileId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `MainSlider` DROP COLUMN `image`,
    ADD COLUMN `fileId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Entry` ADD CONSTRAINT `Entry_fileId_fkey` FOREIGN KEY (`fileId`) REFERENCES `File`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Document` ADD CONSTRAINT `Document_fileId_fkey` FOREIGN KEY (`fileId`) REFERENCES `File`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MainSlider` ADD CONSTRAINT `MainSlider_fileId_fkey` FOREIGN KEY (`fileId`) REFERENCES `File`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
