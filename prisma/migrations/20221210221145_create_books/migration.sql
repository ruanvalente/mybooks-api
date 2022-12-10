-- CreateTable
CREATE TABLE "Books" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "resume" TEXT,
    "imageURL" TEXT,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
