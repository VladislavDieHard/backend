/*
  Warnings:

  - You are about to drop the column `description` on the `MainSlider` table. All the data in the column will be lost.
  - Added the required column `eventTime` to the `Affiche` table without a default value. This is not possible if the table is not empty.
  - Added the required column `desc` to the `MainSlider` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Affiche` ADD COLUMN `eventTime` TIME NOT NULL,
    MODIFY `eventDate` DATE NOT NULL;

-- AlterTable
ALTER TABLE `MainSlider` DROP COLUMN `description`,
    ADD COLUMN `desc` VARCHAR(200) NOT NULL;
