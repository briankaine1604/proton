-- CreateTable
CREATE TABLE `ReviewedBy` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `contactFormId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `ReviewedBy_userId_contactFormId_key`(`userId`, `contactFormId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ReviewedBy` ADD CONSTRAINT `ReviewedBy_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReviewedBy` ADD CONSTRAINT `ReviewedBy_contactFormId_fkey` FOREIGN KEY (`contactFormId`) REFERENCES `ContactForm`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
