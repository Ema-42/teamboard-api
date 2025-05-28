/*
  Warnings:

  - You are about to drop the column `comments` on the `Tasks` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Tasks` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Tasks" DROP COLUMN "comments",
DROP COLUMN "description";
