/*
  Warnings:

  - You are about to drop the column `refresh_token_expires_in` on the `account` table. All the data in the column will be lost.
  - You are about to drop the `del` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `account` DROP COLUMN `refresh_token_expires_in`;

-- DropTable
DROP TABLE `del`;
