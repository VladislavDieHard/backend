/*
  Warnings:

  - You are about to drop the column `afficheId` on the `Entry` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[entryId]` on the table `Affiche` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[hash]` on the table `File` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `hash` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Entry` DROP FOREIGN KEY `Entry_afficheId_fkey`;

-- AlterTable
ALTER TABLE `Affiche` ADD COLUMN `entryId` VARCHAR(191) NULL,
    MODIFY `desc` LONGTEXT NOT NULL,
    MODIFY `eventTime` TIME NOT NULL,
    MODIFY `oldId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Department` MODIFY `oldId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Document` MODIFY `oldId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Entry` DROP COLUMN `afficheId`,
    MODIFY `oldId` INTEGER NULL;

-- AlterTable
ALTER TABLE `File` ADD COLUMN `hash` VARCHAR(64) NOT NULL;

-- AlterTable
ALTER TABLE `MainSlider` MODIFY `oldId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Menu` MODIFY `oldId` INTEGER NULL;

-- AlterTable
ALTER TABLE `MenuItem` MODIFY `oldId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Rubric` MODIFY `oldId` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Affiche_entryId_key` ON `Affiche`(`entryId`);

-- CreateIndex
CREATE UNIQUE INDEX `File_hash_key` ON `File`(`hash`);

-- AddForeignKey
ALTER TABLE `Affiche` ADD CONSTRAINT `Affiche_entryId_fkey` FOREIGN KEY (`entryId`) REFERENCES `Entry`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
