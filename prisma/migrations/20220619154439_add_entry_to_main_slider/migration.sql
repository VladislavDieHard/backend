/*
  Warnings:

  - The values [ENTRY] on the enum `MenuItem_menuItemType` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[entryId]` on the table `MainSlider` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `entryId` to the `MainSlider` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Affiche` MODIFY `eventTime` TIME NOT NULL;

-- AlterTable
ALTER TABLE `MainSlider` ADD COLUMN `entryId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `MenuItem` MODIFY `menuItemType` ENUM('DOCUMENT', 'LINK') NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `MainSlider_entryId_key` ON `MainSlider`(`entryId`);

-- AddForeignKey
ALTER TABLE `MainSlider` ADD CONSTRAINT `MainSlider_entryId_fkey` FOREIGN KEY (`entryId`) REFERENCES `Entry`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
