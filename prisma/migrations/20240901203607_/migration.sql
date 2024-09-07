/*
  Warnings:

  - You are about to alter the column `expires` on the `sessions` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `email_verified` on the `users` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `expires` on the `verificationtokens` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Made the column `organisationName` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `sessions` MODIFY `expires` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `email_verified` DATETIME NULL,
    MODIFY `organisationName` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `verificationtokens` MODIFY `expires` DATETIME NOT NULL;
