/*
  Warnings:

  - You are about to drop the `Card` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `List` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_assignedToId_fkey";

-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_creatorId_fkey";

-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_listId_fkey";

-- DropForeignKey
ALTER TABLE "List" DROP CONSTRAINT "List_boardId_fkey";

-- DropTable
DROP TABLE "Card";

-- DropTable
DROP TABLE "List";

-- CreateTable
CREATE TABLE "Tasks" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "estado" TEXT NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "position" INTEGER NOT NULL,
    "color" TEXT,
    "comments" TEXT,
    "dueDate" TIMESTAMP(3),
    "check" BOOLEAN NOT NULL DEFAULT false,
    "board_id" TEXT NOT NULL,
    "assignedToId" TEXT,
    "created_by" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tasks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Tasks_deleted_idx" ON "Tasks"("deleted");

-- AddForeignKey
ALTER TABLE "Tasks" ADD CONSTRAINT "Tasks_board_id_fkey" FOREIGN KEY ("board_id") REFERENCES "Board"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tasks" ADD CONSTRAINT "Tasks_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tasks" ADD CONSTRAINT "Tasks_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
