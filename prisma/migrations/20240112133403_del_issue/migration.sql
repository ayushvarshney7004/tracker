/*
  Warnings:

  - You are about to drop the column `assignedToUserId` on the `del` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `del` DROP FOREIGN KEY `Del_assignedToUserId_fkey`;

-- AlterTable
ALTER TABLE `del` DROP COLUMN `assignedToUserId`,
    ADD COLUMN `assignedToDelUserId` VARCHAR(255) NULL;

-- AddForeignKey
ALTER TABLE `Del` ADD CONSTRAINT `Del_assignedToDelUserId_fkey` FOREIGN KEY (`assignedToDelUserId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
