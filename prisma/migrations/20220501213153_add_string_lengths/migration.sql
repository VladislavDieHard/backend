/*
  Warnings:

  - You are about to drop the column `description` on the `Affiche` table. All the data in the column will be lost.
  - You are about to alter the column `phone` on the `Affiche` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(20)`.
  - You are about to drop the `menuItems` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `desc` to the `Affiche` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `menuItems` DROP FOREIGN KEY `menuItems_documentId_fkey`;

-- DropForeignKey
ALTER TABLE `menuItems` DROP FOREIGN KEY `menuItems_entryId_fkey`;

-- DropForeignKey
ALTER TABLE `menuItems` DROP FOREIGN KEY `menuItems_menuId_fkey`;

-- AlterTable
ALTER TABLE `Affiche` DROP COLUMN `description`,
    ADD COLUMN `desc` VARCHAR(600) NOT NULL,
    MODIFY `title` VARCHAR(200) NOT NULL,
    MODIFY `phone` VARCHAR(20) NOT NULL;

-- AlterTable
ALTER TABLE `Department` MODIFY `title` VARCHAR(200) NOT NULL;

-- AlterTable
ALTER TABLE `Document` MODIFY `title` VARCHAR(200) NOT NULL,
    MODIFY `content` VARCHAR(4000) NOT NULL;

-- AlterTable
ALTER TABLE `Entry` MODIFY `title` VARCHAR(200) NOT NULL,
    MODIFY `desc` VARCHAR(600) NULL,
    MODIFY `content` VARCHAR(4000) NULL;

-- AlterTable
ALTER TABLE `Rubric` MODIFY `title` VARCHAR(200) NOT NULL;

-- DropTable
DROP TABLE `menuItems`;

-- CreateTable
CREATE TABLE `MenuItem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `menuId` INTEGER NOT NULL,
    `menuItemType` ENUM('ENTRY', 'DOCUMENT', 'LINK') NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `documentId` INTEGER NULL,
    `entryId` INTEGER NULL,
    `link` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MenuItem` ADD CONSTRAINT `MenuItem_entryId_fkey` FOREIGN KEY (`entryId`) REFERENCES `Entry`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MenuItem` ADD CONSTRAINT `MenuItem_documentId_fkey` FOREIGN KEY (`documentId`) REFERENCES `Document`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MenuItem` ADD CONSTRAINT `MenuItem_menuId_fkey` FOREIGN KEY (`menuId`) REFERENCES `Menu`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
