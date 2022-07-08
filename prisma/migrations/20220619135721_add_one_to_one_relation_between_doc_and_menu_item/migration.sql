/*
  Warnings:

  - You are about to drop the column `documentId` on the `MenuItem` table. All the data in the column will be lost.
  - You are about to drop the column `entryId` on the `MenuItem` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[menuItemId]` on the table `Document` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `menuItemId` to the `Document` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `MenuItem` DROP FOREIGN KEY `MenuItem_documentId_fkey`;

-- DropForeignKey
ALTER TABLE `MenuItem` DROP FOREIGN KEY `MenuItem_entryId_fkey`;

-- AlterTable
ALTER TABLE `Affiche` MODIFY `eventTime` TIME NOT NULL;

-- AlterTable
ALTER TABLE `Document` ADD COLUMN `menuItemId` VARCHAR(191) NOT NULL,
    MODIFY `content` LONGTEXT NOT NULL;

-- AlterTable
ALTER TABLE `MenuItem` DROP COLUMN `documentId`,
    DROP COLUMN `entryId`;

-- CreateIndex
CREATE UNIQUE INDEX `Document_menuItemId_key` ON `Document`(`menuItemId`);

-- AddForeignKey
ALTER TABLE `Document` ADD CONSTRAINT `Document_menuItemId_fkey` FOREIGN KEY (`menuItemId`) REFERENCES `MenuItem`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
