-- CreateTable
CREATE TABLE `File` (
    `id` VARCHAR(191) NOT NULL,
    `originalName` VARCHAR(200) NOT NULL,
    `mimeType` VARCHAR(50) NOT NULL,
    `type` ENUM('IMAGE', 'DOCUMENT', 'ARCHIVE', 'EXHIBITION') NOT NULL,
    `path` VARCHAR(400) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
