/*
  Warnings:

  - Added the required column `born_at` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `employee` ADD COLUMN `born_at` DATETIME(3) NOT NULL;
