/*
  Warnings:

  - Made the column `imageURL` on table `Books` required. This step will fail if there are existing NULL values in that column.
  - Made the column `resume` on table `Books` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Books" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'READING',
    "resume" TEXT NOT NULL,
    "imageURL" TEXT NOT NULL,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Books" ("createAt", "id", "imageURL", "resume", "status", "title") SELECT "createAt", "id", "imageURL", "resume", coalesce("status", 'READING') AS "status", "title" FROM "Books";
DROP TABLE "Books";
ALTER TABLE "new_Books" RENAME TO "Books";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
