/*
  Warnings:

  - You are about to alter the column `created` on the `BadPilot` table. The data in that column could be lost. The data in that column will be cast from `String` to `DateTime`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_BadPilot" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pilotId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "created" DATETIME NOT NULL,
    "email" TEXT NOT NULL,
    CONSTRAINT "BadPilot_pilotId_fkey" FOREIGN KEY ("pilotId") REFERENCES "Drone" ("serialNumber") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_BadPilot" ("created", "email", "firstName", "id", "lastName", "phoneNumber", "pilotId") SELECT "created", "email", "firstName", "id", "lastName", "phoneNumber", "pilotId" FROM "BadPilot";
DROP TABLE "BadPilot";
ALTER TABLE "new_BadPilot" RENAME TO "BadPilot";
CREATE UNIQUE INDEX "BadPilot_pilotId_key" ON "BadPilot"("pilotId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
