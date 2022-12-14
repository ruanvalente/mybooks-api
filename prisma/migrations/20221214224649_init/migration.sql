-- CreateEnum
CREATE TYPE "Status" AS ENUM ('READING', 'PAUSED', 'COMPLETED');

-- CreateTable
CREATE TABLE "Books" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "status" "Status" DEFAULT 'READING',
    "resume" TEXT,
    "imageURL" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Books_pkey" PRIMARY KEY ("id")
);
