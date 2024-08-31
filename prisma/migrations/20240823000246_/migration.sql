/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `BlogPost` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `BlogPost` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `blogpost` ADD COLUMN `slug` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `ExternalLinks` (
    `id` VARCHAR(191) NOT NULL,
    `link` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `BlogPost_slug_key` ON `BlogPost`(`slug`);
