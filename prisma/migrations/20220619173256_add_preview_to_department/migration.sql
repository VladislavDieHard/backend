-- AlterTable
ALTER TABLE `Affiche` MODIFY `eventTime` TIME NOT NULL;

-- AlterTable
ALTER TABLE `Department` ADD COLUMN `fileId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Department` ADD CONSTRAINT `Department_fileId_fkey` FOREIGN KEY (`fileId`) REFERENCES `File`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
