/*
  Warnings:

  - You are about to drop the column `pilotId` on the `BadPilot` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_BadPilot" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "created" DATETIME NOT NULL,
    "email" TEXT NOT NULL,
    CONSTRAINT "BadPilot_email_fkey" FOREIGN KEY ("email") REFERENCES "Drone" ("serialNumber") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_BadPilot" ("created", "email", "firstName", "id", "lastName", "phoneNumber") SELECT "created", "email", "firstName", "id", "lastName", "phoneNumber" FROM "BadPilot";
DROP TABLE "BadPilot";
ALTER TABLE "new_BadPilot" RENAME TO "BadPilot";
CREATE UNIQUE INDEX "BadPilot_email_key" ON "BadPilot"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
