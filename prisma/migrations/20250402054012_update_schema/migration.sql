/*
  Warnings:

  - You are about to alter the column `name` on the `OrderItem` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `OrderItem` MODIFY `name` INTEGER NOT NULL;
