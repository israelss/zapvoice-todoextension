/*
  Warnings:

  - Made the column `user_id` on table `Item` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Item` DROP FOREIGN KEY `Item_user_id_fkey`;

-- AlterTable
ALTER TABLE `Item` MODIFY `user_id` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Item` ADD CONSTRAINT `Item_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
