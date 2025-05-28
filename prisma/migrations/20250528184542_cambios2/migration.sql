-- AlterTable
ALTER TABLE "Board" ALTER COLUMN "estado" DROP NOT NULL,
ALTER COLUMN "estado" SET DEFAULT 'active';

-- AlterTable
ALTER TABLE "Tasks" ALTER COLUMN "estado" DROP NOT NULL,
ALTER COLUMN "estado" SET DEFAULT 'active',
ALTER COLUMN "position" DROP NOT NULL;
