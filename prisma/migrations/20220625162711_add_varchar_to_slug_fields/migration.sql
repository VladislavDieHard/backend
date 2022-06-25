-- AlterTable
ALTER TABLE `Affiche` MODIFY `slug` VARCHAR(250) NOT NULL,
    MODIFY `eventTime` TIME NOT NULL;

-- AlterTable
ALTER TABLE `Department` MODIFY `slug` VARCHAR(250) NOT NULL;

-- AlterTable
ALTER TABLE `Entry` MODIFY `slug` VARCHAR(250) NOT NULL;

-- AlterTable
ALTER TABLE `MenuItem` MODIFY `slug` VARCHAR(250) NOT NULL;

-- AlterTable
ALTER TABLE `Rubric` MODIFY `slug` VARCHAR(250) NOT NULL;
