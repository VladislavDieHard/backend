/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `MenuItem` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Affiche` ADD COLUMN `isDeleted` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `title` VARCHAR(500) NOT NULL;

-- AlterTable
ALTER TABLE `Department` ADD COLUMN `isDeleted` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `Document` ADD COLUMN `isDeleted` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `Entry` ADD COLUMN `isDeleted` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `File` ADD COLUMN `preview` VARCHAR(400) NULL;

-- AlterTable
ALTER TABLE `MainSlider` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `isDeleted` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `Menu` ADD COLUMN `isDeleted` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `MenuItem` ADD COLUMN `isDeleted` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `Rubric` ADD COLUMN `isDeleted` BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX `MenuItem_slug_key` ON `MenuItem`(`slug`);
