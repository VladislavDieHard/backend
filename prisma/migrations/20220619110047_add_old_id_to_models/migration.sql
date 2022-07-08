/*
  Warnings:

  - A unique constraint covering the columns `[oldId]` on the table `Affiche` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[oldId]` on the table `Department` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title]` on the table `Department` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[oldId]` on the table `Document` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[oldId]` on the table `Entry` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[oldId]` on the table `MainSlider` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[oldId]` on the table `Menu` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title]` on the table `Menu` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[oldId]` on the table `MenuItem` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title]` on the table `MenuItem` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[oldId]` on the table `Rubric` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title]` on the table `Rubric` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `oldId` to the `Affiche` table without a default value. This is not possible if the table is not empty.
  - Added the required column `oldId` to the `Department` table without a default value. This is not possible if the table is not empty.
  - Added the required column `oldId` to the `Document` table without a default value. This is not possible if the table is not empty.
  - Added the required column `oldId` to the `Entry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `oldId` to the `MainSlider` table without a default value. This is not possible if the table is not empty.
  - Added the required column `oldId` to the `Menu` table without a default value. This is not possible if the table is not empty.
  - Added the required column `oldId` to the `MenuItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `oldId` to the `Rubric` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Affiche` ADD COLUMN `oldId` INTEGER NOT NULL,
    MODIFY `eventTime` TIME NOT NULL;

-- AlterTable
ALTER TABLE `Department` ADD COLUMN `oldId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Document` ADD COLUMN `oldId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Entry` ADD COLUMN `oldId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `MainSlider` ADD COLUMN `oldId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Menu` ADD COLUMN `oldId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `MenuItem` ADD COLUMN `oldId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Rubric` ADD COLUMN `oldId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Affiche_oldId_key` ON `Affiche`(`oldId`);

-- CreateIndex
CREATE UNIQUE INDEX `Department_oldId_key` ON `Department`(`oldId`);

-- CreateIndex
CREATE UNIQUE INDEX `Department_title_key` ON `Department`(`title`);

-- CreateIndex
CREATE UNIQUE INDEX `Document_oldId_key` ON `Document`(`oldId`);

-- CreateIndex
CREATE UNIQUE INDEX `Entry_oldId_key` ON `Entry`(`oldId`);

-- CreateIndex
CREATE UNIQUE INDEX `MainSlider_oldId_key` ON `MainSlider`(`oldId`);

-- CreateIndex
CREATE UNIQUE INDEX `Menu_oldId_key` ON `Menu`(`oldId`);

-- CreateIndex
CREATE UNIQUE INDEX `Menu_title_key` ON `Menu`(`title`);

-- CreateIndex
CREATE UNIQUE INDEX `MenuItem_oldId_key` ON `MenuItem`(`oldId`);

-- CreateIndex
CREATE UNIQUE INDEX `MenuItem_title_key` ON `MenuItem`(`title`);

-- CreateIndex
CREATE UNIQUE INDEX `Rubric_oldId_key` ON `Rubric`(`oldId`);

-- CreateIndex
CREATE UNIQUE INDEX `Rubric_title_key` ON `Rubric`(`title`);
