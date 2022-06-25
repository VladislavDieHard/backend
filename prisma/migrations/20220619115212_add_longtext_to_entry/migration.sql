-- AlterTable
ALTER TABLE `Affiche` MODIFY `eventTime` TIME NOT NULL;

-- AlterTable
ALTER TABLE `Entry` MODIFY `desc` LONGTEXT NULL,
    MODIFY `content` LONGTEXT NULL;
