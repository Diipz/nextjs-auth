/*
  Warnings:

  - You are about to alter the column `expires` on the `sessions` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `email_verified` on the `users` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `expires` on the `verificationtokens` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `sessions` MODIFY `expires` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `email_verified` DATETIME NULL;

-- AlterTable
ALTER TABLE `verificationtokens` MODIFY `expires` DATETIME NOT NULL;
